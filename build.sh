#!/usr/bin/env bash
# Build per-version Java Evolution example modules with a pinned JDK 25.
#
# Layout: each java<N>/ directory is a standalone Maven project (no parent pom).
#
# Usage:
#   ./build.sh                                       # build every java<N>/ in turn (clean package)
#   ./build.sh java8                                 # build only java8 (clean package)
#   ./build.sh java8 test                            # build only java8, target test
#   ./build.sh java8 -Dtest=BinaryLiteralsTest test  # single test class
#   ./build.sh -DskipTests                           # all modules, skip tests
#   ./build.sh --help                                # show this help
#
# Any extra args are forwarded to mvn verbatim. If no Maven goal is present
# in the args, `clean package` is prepended.
#
# Why this script exists: the toolchain pins JDK 25 at /workspace/soft/jdk-25.0.3+9
# and uses the repo-local maven-settings.xml instead of whatever lives at
# ~/.m2/settings.xml. Doing those by hand for every module is error-prone,
# so the wrapper enforces them.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SETTINGS_FILE="${SCRIPT_DIR}/maven-settings.xml"
JDK_HOME="${JAVA_HOME_OVERRIDE:-/workspace/soft/jdk-25.0.3+9}"

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  awk '/^#!/ {next} /^[^#]/ {exit} {sub(/^# ?/, ""); print}' "${BASH_SOURCE[0]}"
  exit 0
fi

if [[ ! -x "${JDK_HOME}/bin/java" ]]; then
  echo "ERROR: JDK 25 not found at ${JDK_HOME}/bin/java" >&2
  echo "       Set JAVA_HOME_OVERRIDE to a working JDK 25 directory and retry." >&2
  exit 1
fi

if [[ ! -f "${SETTINGS_FILE}" ]]; then
  echo "ERROR: maven-settings.xml not found at ${SETTINGS_FILE}" >&2
  exit 1
fi

export JAVA_HOME="${JDK_HOME}"
export PATH="${JDK_HOME}/bin:${PATH}"

# If the first arg looks like a module dir (java<N>), pull it off as the target module.
TARGET_MODULE=""
if [[ "${1:-}" =~ ^java[0-9]+$ ]]; then
  TARGET_MODULE="$1"
  shift
fi

# Default goals when caller didn't specify any.
ARGS=("$@")
HAS_GOAL=false
for arg in "${ARGS[@]}"; do
  case "${arg}" in
    clean|validate|compile|test|package|verify|install|deploy|site)
      HAS_GOAL=true
      break
      ;;
  esac
done
if [[ "${HAS_GOAL}" == false ]]; then
  ARGS=(clean package "${ARGS[@]}")
fi

run_in_module() {
  local module_dir="$1"
  if [[ ! -f "${module_dir}/pom.xml" ]]; then
    echo "ERROR: no pom.xml in ${module_dir}" >&2
    return 1
  fi
  echo "==> JAVA_HOME=${JAVA_HOME}"
  echo "==> cwd=${module_dir}"
  echo "==> mvn -s ${SETTINGS_FILE} ${ARGS[*]}"
  (cd "${module_dir}" && mvn -s "${SETTINGS_FILE}" "${ARGS[@]}")
}

if [[ -n "${TARGET_MODULE}" ]]; then
  if [[ ! -d "${SCRIPT_DIR}/${TARGET_MODULE}" ]]; then
    echo "ERROR: module directory not found: ${SCRIPT_DIR}/${TARGET_MODULE}" >&2
    exit 1
  fi
  run_in_module "${SCRIPT_DIR}/${TARGET_MODULE}"
  exit $?
fi

# No module specified — iterate over every java<N>/ in numeric order.
shopt -s nullglob
mapfile -t MODULES < <(
  for d in "${SCRIPT_DIR}"/java[0-9]*; do
    [[ -d "$d" && -f "$d/pom.xml" ]] || continue
    name="$(basename "$d")"
    n="${name#java}"
    [[ "$n" =~ ^[0-9]+$ ]] || continue
    printf '%d\t%s\n' "$n" "$d"
  done | sort -n | cut -f2
)

if [[ ${#MODULES[@]} -eq 0 ]]; then
  echo "ERROR: no java<N>/ modules found under ${SCRIPT_DIR}" >&2
  exit 1
fi

for module_dir in "${MODULES[@]}"; do
  echo
  echo "###############################################################"
  echo "# $(basename "${module_dir}")"
  echo "###############################################################"
  run_in_module "${module_dir}"
done
