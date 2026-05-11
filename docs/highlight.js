/* ============================================================
   Java Evolution — regex-based syntax highlighter
   Handles: java + shell. Tokenizes by walking the source once,
   tracking strings/comments first so keywords inside them
   don't get mis-colored.
   ============================================================ */

(function () {
  const JAVA_KEYWORDS = new Set([
    "abstract","assert","break","case","catch","class","const","continue",
    "default","do","else","enum","extends","final","finally","for","goto",
    "if","implements","import","instanceof","interface","module","native",
    "new","non-sealed","open","opens","package","permits","private",
    "protected","provides","public","record","requires","return","sealed",
    "static","strictfp","super","switch","synchronized","this","throw",
    "throws","to","transient","transitive","try","uses","var","volatile",
    "when","while","with","yield"
  ]);

  const JAVA_TYPES = new Set([
    "boolean","byte","char","double","float","int","long","short","void",
    "String","Object","List","Map","Set","Collection","ArrayList","HashMap",
    "LinkedHashMap","HashSet","Optional","Stream","IntStream","LongStream",
    "DoubleStream","Stream","CompletableFuture","Future","Supplier",
    "Function","Consumer","Predicate","BiFunction","BiConsumer","Comparator",
    "Runnable","Thread","Executor","ExecutorService","Executors","Duration",
    "Instant","LocalDate","LocalDateTime","LocalTime","ZonedDateTime",
    "ZoneId","Period","Month","NumberFormat","Locale","Path","Paths","Files",
    "URI","URL","HttpClient","HttpRequest","HttpResponse","BodyHandlers",
    "InputStream","OutputStream","Reader","Writer","FileReader","FileWriter",
    "InetAddress","Socket","ServerSocketChannel","SocketChannel",
    "UnixDomainSocketAddress","StandardProtocolFamily","StandardCharsets",
    "StandardOpenOption","BigDecimal","BigInteger","BiInteger","Currency",
    "Objects","Collectors","Collectors","Arrays","Collections",
    "MethodHandles","Lookup","MethodHandle","MethodTypeDesc","ClassDesc",
    "ClassFile","ClassModel","MethodModel","ClassOption","Configuration",
    "InetAddressResolver","InetAddressResolverProvider","LookupPolicy",
    "Module","Modifier","ResourceScope","Arena","MemorySegment","Linker",
    "SymbolLookup","ValueLayout","FunctionDescriptor","KEM","Signature",
    "KeyPair","KeyPairGenerator","NamedParameterSpec","X509Certificate",
    "PEMEncoder","PEMDecoder","StructuredTaskScope","ScopedValue",
    "RandomGenerator","RandomGeneratorFactory","SequencedCollection",
    "SequencedMap","SequencedSet","Gatherer","Gatherers","Pair","Point",
    "Line","Shape","Circle","Square","Triangle","Json","JString","JNumber",
    "JBool","JNull","JArray","JObject","User","Order","Request","Result",
    "Money","Range","Address","Page","RequestId","HttpExchange","Greeter",
    "AuditLog","CustomResolverProvider","ClassLoader","System","Math",
    "Integer","Long","Double","Float","Byte","Short","Character","Boolean",
    "Number","Throwable","Exception","RuntimeException","IOException",
    "IllegalArgumentException","IllegalStateException","UnsupportedOperationException",
    "InterruptedException","NullPointerException","TimeUnit","Joiner",
    "BodyHandlers","IO","Date","Calendar","Iterable","Iterator",
    "Predicate","ClassFile","Person","LineItem","Profile","Calc","Hello",
    "Greet","ProcessBuilder","ClassOption","JFR","Hexagon","MyApp"
  ]);

  const JAVA_LITERALS = new Set(["true","false","null"]);

  // Java tokenizer: produces an array of {type, text} objects
  function tokenizeJava(src) {
    const tokens = [];
    let i = 0;
    const n = src.length;

    const push = (type, text) => tokens.push({ type, text });

    while (i < n) {
      const c = src[i];
      const c2 = src.substr(i, 2);

      // Line comment
      if (c2 === "//") {
        const end = src.indexOf("\n", i);
        const stop = end === -1 ? n : end;
        push("com", src.slice(i, stop));
        i = stop;
        continue;
      }

      // Block comment (incl. javadoc /** */ and /// (markdown javadoc))
      if (c2 === "/*") {
        const end = src.indexOf("*/", i + 2);
        const stop = end === -1 ? n : end + 2;
        push("com", src.slice(i, stop));
        i = stop;
        continue;
      }
      if (c2 === "//" || src.substr(i, 3) === "///") {
        const end = src.indexOf("\n", i);
        const stop = end === -1 ? n : end;
        push("com", src.slice(i, stop));
        i = stop;
        continue;
      }

      // Text block: """ ... """
      if (src.substr(i, 3) === '"""') {
        const end = src.indexOf('"""', i + 3);
        const stop = end === -1 ? n : end + 3;
        push("str", src.slice(i, stop));
        i = stop;
        continue;
      }

      // String literal: " ... " (with escapes)
      if (c === '"') {
        let j = i + 1;
        while (j < n) {
          if (src[j] === "\\" && j + 1 < n) { j += 2; continue; }
          if (src[j] === '"') { j++; break; }
          if (src[j] === "\n") break;
          j++;
        }
        push("str", src.slice(i, j));
        i = j;
        continue;
      }

      // Char literal: ' ... '
      if (c === "'") {
        let j = i + 1;
        while (j < n) {
          if (src[j] === "\\" && j + 1 < n) { j += 2; continue; }
          if (src[j] === "'") { j++; break; }
          if (src[j] === "\n") break;
          j++;
        }
        push("str", src.slice(i, j));
        i = j;
        continue;
      }

      // Annotation: @Identifier
      if (c === "@") {
        let j = i + 1;
        while (j < n && /[A-Za-z0-9_]/.test(src[j])) j++;
        push("ann", src.slice(i, j));
        i = j;
        continue;
      }

      // Number literal (int, long, float, double, hex, underscores)
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(src[i + 1] || ""))) {
        let j = i;
        if (src.substr(j, 2).toLowerCase() === "0x") {
          j += 2;
          while (j < n && /[0-9A-Fa-f_]/.test(src[j])) j++;
        } else {
          while (j < n && /[0-9_]/.test(src[j])) j++;
          if (src[j] === ".") {
            j++;
            while (j < n && /[0-9_]/.test(src[j])) j++;
          }
          if (/[eE]/.test(src[j] || "")) {
            j++;
            if (/[+\-]/.test(src[j] || "")) j++;
            while (j < n && /[0-9_]/.test(src[j])) j++;
          }
        }
        // type suffix
        if (/[LlFfDd]/.test(src[j] || "")) j++;
        push("num", src.slice(i, j));
        i = j;
        continue;
      }

      // Identifier / keyword / type
      if (/[A-Za-z_$]/.test(c)) {
        let j = i;
        while (j < n && /[A-Za-z0-9_$]/.test(src[j])) j++;
        const word = src.slice(i, j);

        if (JAVA_KEYWORDS.has(word))         push("key", word);
        else if (JAVA_LITERALS.has(word))    push("bool", word);
        else if (JAVA_TYPES.has(word))       push("type", word);
        else if (/^[A-Z][A-Za-z0-9_$]*$/.test(word)) {
          // Heuristic: PascalCase → type
          push("type", word);
        } else {
          // Method call (followed by '(')? color as function name
          let k = j;
          while (k < n && /[ \t]/.test(src[k])) k++;
          if (src[k] === "(") push("fn", word);
          else push("plain", word);
        }
        i = j;
        continue;
      }

      // Operators / punctuation (single chars; multi-char are fine if we color individually)
      if (/[+\-*/%=<>!&|^~?:]/.test(c)) {
        let j = i;
        while (j < n && /[+\-*/%=<>!&|^~?:]/.test(src[j])) j++;
        push("op", src.slice(i, j));
        i = j;
        continue;
      }

      if (/[{}()\[\];,.]/.test(c)) {
        push("punc", c);
        i++;
        continue;
      }

      // whitespace / anything else
      push("plain", c);
      i++;
    }
    return tokens;
  }

  // Shell tokenizer: highlight comments, strings, flags
  function tokenizeShell(src) {
    const tokens = [];
    let i = 0;
    const n = src.length;
    const push = (type, text) => tokens.push({ type, text });

    while (i < n) {
      const c = src[i];

      // comment
      if (c === "#") {
        const end = src.indexOf("\n", i);
        const stop = end === -1 ? n : end;
        push("com", src.slice(i, stop));
        i = stop;
        continue;
      }

      // string " ... " or ' ... '
      if (c === '"' || c === "'") {
        const quote = c;
        let j = i + 1;
        while (j < n) {
          if (src[j] === "\\" && j + 1 < n) { j += 2; continue; }
          if (src[j] === quote) { j++; break; }
          if (src[j] === "\n") break;
          j++;
        }
        push("str", src.slice(i, j));
        i = j;
        continue;
      }

      // prompt $
      if (c === "$" && (i === 0 || src[i - 1] === "\n")) {
        push("ann", "$");
        i++;
        continue;
      }

      // flag: -x or --foo
      if (c === "-" && /[A-Za-z]/.test(src[i + 1] || "")) {
        let j = i;
        while (j < n && /[A-Za-z0-9_+:.\-]/.test(src[j])) j++;
        push("num", src.slice(i, j));
        i = j;
        continue;
      }

      push("plain", c);
      i++;
    }
    return tokens;
  }

  function escape(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  window.highlightCode = function (code, lang) {
    const tokens = lang === "shell" ? tokenizeShell(code) : tokenizeJava(code);
    let out = "";
    for (const t of tokens) {
      if (t.type === "plain") out += escape(t.text);
      else out += `<span class="tk-${t.type}">${escape(t.text)}</span>`;
    }
    return out;
  };
})();
