/* ============================================================
   Java Evolution — React app
   ============================================================ */

const { useState, useEffect, useMemo, useRef, useCallback } = React;

/* ------- Icons (inline SVG) ------- */
const Icon = {
  search: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  sun: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  moon: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  copy: (p) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  check: (p) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  laurel: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v18" />
      <path d="M6 6c-2 3-2 8 0 11M6 9c-1 0-2 .5-2 1.5M7 12c-1 0-2 .5-2 1.5M8 15c-1 0-2 .5-2 1.5" />
      <path d="M18 6c2 3 2 8 0 11M18 9c1 0 2 .5 2 1.5M17 12c1 0 2 .5 2 1.5M16 15c1 0 2 .5 2 1.5" />
    </svg>
  )
};

/* ------- Code block with copy & before/after toggle ------- */
function CodeBlock({ before, after, single }) {
  const [view, setView] = useState("after");  // 'before' | 'after'
  const [copied, setCopied] = useState(false);
  const active = single ? single : (view === "before" ? before : after);
  const html = useMemo(
    () => window.highlightCode(active.code, active.lang || "java"),
    [active]
  );

  const copy = () => {
    navigator.clipboard.writeText(active.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }).catch(() => {});
  };

  return (
    <div className="code-wrap">
      <div className="code-header">
        <span className="lang">{active.lang || "java"}</span>
        <div className="actions">
          {!single && (
            <div className="seg" role="tablist" aria-label="Before / After">
              <button className={view === "before" ? "active" : ""}
                      onClick={() => setView("before")}>Before</button>
              <button className={view === "after" ? "active" : ""}
                      onClick={() => setView("after")}>After</button>
            </div>
          )}
          <button onClick={copy} aria-label="Copy code">
            {copied ? <Icon.check /> : <Icon.copy />}
            <span>{copied ? "copied" : "copy"}</span>
          </button>
        </div>
      </div>
      <pre><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
    </div>
  );
}

/* ------- Feature card ------- */
function FeatureCard({ f, dimmed }) {
  const tagClass = `tag t-${f.tag}`;
  const tagLabel = {
    language: "Language", api: "API", jvm: "JVM",
    tooling: "Tooling", preview: "Preview"
  }[f.tag] || f.tag;

  const hasBeforeAfter = f.before && f.after;
  const codeProps = hasBeforeAfter
    ? { before: f.before, after: f.after }
    : { single: f.code };

  return (
    <article className={"feature-card" + (dimmed ? " dimmed" : "")}>
      <header className="feature-head">
        <div className="feature-title-row">
          <h3 className="feature-title">{f.name}</h3>
          <span className={tagClass}>{tagLabel}</span>
        </div>
        <p className="feature-summary">{f.summary}</p>
      </header>
      <p className="feature-desc">{f.desc}</p>
      <CodeBlock {...codeProps} />
    </article>
  );
}

/* ------- Deprecations strip ------- */
function Deprecations({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="deprecations">
      <header className="dep-header">
        <span className="label">Deprecated & removed</span>
        <span className="count">{items.length} item{items.length === 1 ? "" : "s"}</span>
      </header>
      <div className="dep-list">
        {items.map((d, i) => (
          <div className="dep-item" key={i}>
            <span className="what">{d.what}</span>
            <span className="kind">{d.kind}</span>
            <p className="note">{d.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------- Version section ------- */
function VersionSection({ v, matches, filters }) {
  const { tags, hidePreview, query } = filters;

  const visibleFeatures = v.features.filter(f => {
    if (hidePreview && f.tag === "preview") return false;
    if (!tags.has(f.tag)) return false;
    if (query) {
      const q = query.toLowerCase();
      const hay = (f.name + " " + f.summary + " " + f.desc).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const isEmpty = visibleFeatures.length === 0 && !query;
  const isFilteredOut = visibleFeatures.length === 0 && query;

  return (
    <section
      id={`v${v.version}`}
      className={`version ${v.lts ? "is-lts" : ""} ${isFilteredOut ? "empty" : ""}`}
      data-version={v.version}
    >
      <header className={`version-header ${v.lts ? "lts" : ""}`}>
        <div className="left">
          <div className="vnum">
            <em>Java {v.version}</em>
          </div>
          <div className="version-meta">
            <div className="row">
              <span className="date">{v.date}</span>
              {v.codename && <span className="codename">"{v.codename}"</span>}
            </div>
            <div className="row">
              {v.lts && (
                <span className="lts-badge">
                  <Icon.laurel /> LTS
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="version-blurb">{v.blurb}</p>
      </header>

      {visibleFeatures.length === 0 ? (
        query ? (
          <div className="no-matches">No features match "{query}" in Java {v.version}</div>
        ) : null
      ) : (
        <div className="features-grid">
          {visibleFeatures.map((f, i) => (
            <FeatureCard f={f} key={i} />
          ))}
        </div>
      )}

      {!query && <Deprecations items={v.deprecations} />}
    </section>
  );
}

/* ------- Filter chip ------- */
const TAG_META = [
  { id: "language", label: "Language" },
  { id: "api",      label: "API" },
  { id: "jvm",      label: "JVM" },
  { id: "tooling",  label: "Tooling" },
  { id: "preview",  label: "Preview" }
];

function FilterChip({ id, label, active, onClick }) {
  return (
    <button
      className={"chip" + (active ? " active" : "")}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className={"dot"} style={{ background: `var(--tag-${id})` }} />
      {label}
    </button>
  );
}

/* ------- Sidebar ------- */
function Sidebar({ data, activeVersion, onJump, theme, toggleTheme }) {
  const firstYear    = data[0]?.date?.match(/\d{4}/)?.[0];
  const lastYear     = data[data.length - 1]?.date?.match(/\d{4}/)?.[0];
  const firstVersion = data[0]?.version;
  const lastVersion  = data[data.length - 1]?.version;
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="eyebrow">Reference · {firstYear} → {lastYear}</div>
        <div className="title">Java <em>Evolution</em></div>
        <div className="sub">Features &amp; deprecations from Java {firstVersion} to Java {lastVersion}</div>
      </div>

      <nav className="nav-section" aria-label="Versions">
        <div className="nav-label">Versions</div>
        {data.map(v => (
          <a
            key={v.version}
            href={`#v${v.version}`}
            onClick={(e) => { e.preventDefault(); onJump(v.version); }}
            className={"nav-item" + (activeVersion === v.version ? " active" : "")}
          >
            <span className="nv">
              <span className="num">{v.version}</span>
              <span className="yr">{v.date.split(",")[1]?.trim() || ""}</span>
            </span>
            {v.lts && <span className="lts-dot" title="LTS" />}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="legend">
          {TAG_META.map(t => (
            <div className="row" key={t.id}>
              <span className="swatch" style={{ background: `var(--tag-${t.id})` }} />
              {t.label}
            </div>
          ))}
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
          <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>
      </div>
    </aside>
  );
}

/* ------- Main App ------- */
function App() {
  const data = window.JAVA_DATA;

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("java-evo-theme") || "dark";
  });
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState(() => new Set(TAG_META.map(t => t.id)));
  const [hidePreview, setHidePreview] = useState(false);
  const [activeVersion, setActiveVersion] = useState(() => window.JAVA_DATA[0]?.version ?? 8);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("java-evo-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const toggleTag = (id) => {
    setTags(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  /* --- Scroll-spy to highlight current version in sidebar --- */
  useEffect(() => {
    const sections = data.map(v => document.getElementById(`v${v.version}`)).filter(Boolean);
    if (sections.length === 0) return;
    const obs = new IntersectionObserver((entries) => {
      // pick the topmost section currently intersecting the viewport
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) {
        const v = Number(visible[0].target.dataset.version);
        setActiveVersion(v);
      }
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [data]);

  /* --- Keyboard navigation: ↑/↓ between versions --- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "j" && e.key !== "k") return;
      e.preventDefault();
      const versions = data.map(v => v.version);
      const idx = versions.indexOf(activeVersion);
      const dir = (e.key === "ArrowDown" || e.key === "j") ? 1 : -1;
      const next = versions[Math.max(0, Math.min(versions.length - 1, idx + dir))];
      jump(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVersion, data]);

  /* --- Cmd/Ctrl+K to focus search --- */
  const searchRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const jump = (versionNum) => {
    const el = document.getElementById(`v${versionNum}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveVersion(versionNum);
    }
  };

  const filters = { tags, hidePreview, query };

  const totalFeatures = useMemo(
    () => data.reduce((acc, v) => acc + v.features.length, 0),
    [data]
  );
  const totalDeprecations = useMemo(
    () => data.reduce((acc, v) => acc + v.deprecations.length, 0),
    [data]
  );
  const ltsCount = useMemo(
    () => data.filter(v => v.lts).length,
    [data]
  );
  const firstVersion = data[0]?.version;
  const lastVersion  = data[data.length - 1]?.version;
  const lastDate     = data[data.length - 1]?.date;            // e.g. "March 17, 2026"
  const lastMonthYear = (() => {                                // → "Mar 2026"
    const m = lastDate?.match(/^(\w+)\s+\d+,\s+(\d{4})$/);
    return m ? `${m[1].slice(0, 3)} ${m[2]}` : "";
  })();

  // Count matching features for the results pill
  const matchCount = useMemo(() => {
    let n = 0;
    for (const v of data) {
      for (const f of v.features) {
        if (hidePreview && f.tag === "preview") continue;
        if (!tags.has(f.tag)) continue;
        if (query) {
          const q = query.toLowerCase();
          if (!(f.name + " " + f.summary + " " + f.desc).toLowerCase().includes(q)) continue;
        }
        n++;
      }
    }
    return n;
  }, [data, tags, hidePreview, query]);

  return (
    <div className="app">
      <Sidebar
        data={data}
        activeVersion={activeVersion}
        onJump={jump}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Mobile topbar */}
      <header className="topbar">
        <span className="brand">Java Evolution</span>
        <nav className="mobile-versions">
          {data.map(v => (
            <a key={v.version} href={`#v${v.version}`}
               className={activeVersion === v.version ? "active" : ""}
               onClick={(e) => { e.preventDefault(); jump(v.version); }}>
              {v.version}{v.lts ? "★" : ""}
            </a>
          ))}
        </nav>
        <button className="theme-toggle" onClick={toggleTheme}
                style={{ padding: "6px 8px" }}>
          {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
        </button>
      </header>

      <main className="main">
        <section className="hero">
          <h1>Every release, every feature —<br/><em>one page</em> of Java.</h1>
          <p className="lede">
            A working reference covering every release from Java {firstVersion} through Java {lastVersion} — the
            features that mattered, what they replaced, what got removed along the way,
            and what each one looks like in actual code. Filter by category, search by
            name, toggle previews on or off. Use <kbd>⌘K</kbd> to search, <kbd>↑</kbd>/<kbd>↓</kbd> to
            move between versions.
          </p>
          <div className="stats">
            <div className="stat"><span className="v">{data.length}</span><span className="k">Releases</span></div>
            <div className="stat"><span className="v">{ltsCount}</span><span className="k">LTS versions</span></div>
            <div className="stat"><span className="v">{totalFeatures}</span><span className="k">Features</span></div>
            <div className="stat"><span className="v">{totalDeprecations}</span><span className="k">Deprecations</span></div>
          </div>
        </section>

        <div className="filterbar" role="toolbar" aria-label="Filters">
          <div className={"search" + (query ? " has-value" : "")}>
            <span className="sicon"><Icon.search /></span>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search features…  (⌘K)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button className="clear" onClick={() => setQuery("")} aria-label="Clear">×</button>
            )}
          </div>

          <div className="chips">
            {TAG_META.map(t => (
              <FilterChip
                key={t.id}
                id={t.id}
                label={t.label}
                active={tags.has(t.id)}
                onClick={() => toggleTag(t.id)}
              />
            ))}
          </div>

          <label className={"toggle-switch" + (hidePreview ? " on" : "")}>
            <input type="checkbox" checked={hidePreview}
                   onChange={(e) => setHidePreview(e.target.checked)} />
            <span className="track" />
            <span>Hide previews</span>
          </label>

          <span className="results-pill">
            {matchCount} feature{matchCount === 1 ? "" : "s"} shown
          </span>
        </div>

        {data.map(v => (
          <VersionSection
            key={v.version}
            v={v}
            filters={filters}
          />
        ))}

        <footer className="foot">
          <span>Java Evolution · A reference cheat-sheet · Built offline-first</span>
          <span>Data current as of Java {lastVersion} ({lastMonthYear}) · No external network calls</span>
        </footer>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
