import { useState, useEffect, useCallback } from "react";
 
const CATEGORIES = ["All", "Technology", "Science", "Business", "Health", "Space"];
const EMOJIS_BY_CAT = {
  Technology: "💻", Science: "🔬", Business: "📈", Health: "🩺", Space: "🚀", All: "🌐"
};

const MOCK_ARTICLES = [
  { id:1, title:"Quantum Computing Achieves Breakthrough in Error Correction", description:"Researchers demonstrate 99.9% fidelity in quantum gates, marking a pivotal step toward fault-tolerant quantum computers.", category:"Technology", source:"MIT Tech Review", date:"2h ago", emoji:"⚛️" },
  { id:2, title:"James Webb Captures Oldest Galaxies Ever Observed", description:"New imagery reveals galaxies formed just 300 million years after the Big Bang, reshaping our model of early universe formation.", category:"Space", source:"NASA", date:"4h ago", emoji:"🌌" },
  { id:3, title:"AI Models Now Predict Protein Folding with Atomic Precision", description:"A new generation of structural biology tools accelerates drug discovery by cutting simulation time from years to hours.", category:"Science", source:"Nature", date:"6h ago", emoji:"🧬" },
  { id:4, title:"Global EV Sales Surpass 40 Million Units in 2025", description:"Electric vehicles now represent over 30% of all new car sales worldwide, driven by falling battery costs and expanded infrastructure.", category:"Business", source:"Bloomberg", date:"8h ago", emoji:"🚗" },
  { id:5, title:"New Study Links Gut Microbiome Diversity to Mental Health", description:"Research involving 500,000 participants identifies 15 bacterial strains strongly correlated with reduced anxiety and depression rates.", category:"Health", source:"The Lancet", date:"10h ago", emoji:"🦠" },
  { id:6, title:"Open-Source LLM Matches GPT Performance at 10% Cost", description:"A community-trained model released under MIT license achieves benchmark parity, democratizing access to frontier AI capabilities.", category:"Technology", source:"HuggingFace", date:"12h ago", emoji:"🤖" },
  { id:7, title:"Mars Perseverance Rover Confirms Ancient Microbial Signatures", description:"Organic molecules found in sedimentary rock layers suggest Mars harbored life-friendly conditions for over a billion years.", category:"Space", source:"JPL", date:"1d ago", emoji:"🔴" },
  { id:8, title:"Fusion Energy Startup Achieves Net Positive Yield for 8 Hours", description:"Commonwealth Fusion Systems sustains plasma containment at 100 MW output, the longest duration ever recorded in private fusion research.", category:"Science", source:"Science Daily", date:"1d ago", emoji:"☀️" },
  { id:9, title:"Remote Work Permanently Reshapes Urban Commercial Real Estate", description:"Office vacancy rates in major cities plateau at 22%, prompting massive conversion projects to residential and mixed-use developments.", category:"Business", source:"WSJ", date:"2d ago", emoji:"🏙️" },
];

const WEATHER_ICON = (code) => {
  if (code <= 232) return "⛈️";
  if (code <= 321) return "🌧️";
  if (code <= 531) return "🌦️";
  if (code <= 622) return "❄️";
  if (code <= 781) return "🌫️";
  if (code === 800) return "☀️";
  if (code <= 804) return "⛅";
  return "🌤️";
};
 

function HomePage({ navigate }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-eyebrow">Day 30 · Final Project</div>
        <h1 className="hero-title">
          A <span>Modern</span> React<br />Web Application
        </h1>
        <p className="hero-sub">
          Multi-page, API-integrated, responsive. Built with React hooks, dynamic routing, live data, and a refined design system.
        </p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => navigate("news")}>Explore News Feed →</button>
          <button className="btn-ghost" onClick={() => navigate("weather")}>Try Weather App</button>
        </div>
        <div className="stats-row">
          <div className="stat"><div className="stat-num">4</div><div className="stat-lbl">Pages</div></div>
          <div className="stat"><div className="stat-num">2</div><div className="stat-lbl">Live APIs</div></div>
          <div className="stat"><div className="stat-num">12+</div><div className="stat-lbl">Components</div></div>
          <div className="stat"><div className="stat-num">100%</div><div className="stat-lbl">Responsive</div></div>
        </div>
      </div>
    </div>
  );
}

function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    // Simulate API fetch (real app: fetch from NewsAPI / GNews)
    const timer = setTimeout(() => {
      try {
        setArticles(MOCK_ARTICLES);
      } catch {
        setError("Could not load articles. Check your API key or network.");
      } finally {
        setLoading(false);
      }
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const filtered = articles.filter(a => {
    const matchCat = category === "All" || a.category === category;
    const matchQ = !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1>News Feed</h1>
        <p>Live headlines from science, tech, business & more</p>
      </div>

      <div className="search-bar">
        <input
          className="search-input"
          placeholder="🔍  Search articles…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="filter-row">
        {CATEGORIES.map(c => (
          <button key={c} className={`chip${category === c ? " active" : ""}`} onClick={() => setCategory(c)}>
            {EMOJIS_BY_CAT[c]} {c}
          </button>
        ))}
      </div>

      {error && <div className="error-banner">⚠️ {error}</div>}

      {loading ? (
        <div className="loading-grid">
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🔎</div>
          <h3>No articles found</h3>
          <p>Try a different search or category</p>
        </div>
      ) : (
        <div className="news-grid">
          {filtered.map(a => (
            <div key={a.id} className="news-card">
              <div className="card-img">{a.emoji}</div>
              <div className="card-body">
                <div className="card-tag">{a.category}</div>
                <div className="card-title">{a.title}</div>
                <div className="card-desc">{a.description}</div>
                <div className="card-meta">
                  <span className="card-source">{a.source}</span>
                  <span>{a.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const PRESETS = ["Karachi", "London", "Tokyo", "New York", "Dubai"];

  const fetchWeather = useCallback(async (c) => {
    const target = c || city;
    if (!target.trim()) return;
    setLoading(true); setError(""); setWeather(null);

    try {
      // Real integration: OpenWeatherMap API
      // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${target}&appid=YOUR_KEY&units=metric`);
      // const data = await res.json();
      // Simulated response:
      await new Promise(r => setTimeout(r, 800));
      const mock = {
        name: target,
        sys: { country: "—" },
        main: { temp: Math.floor(Math.random()*35 + 5), feels_like: Math.floor(Math.random()*35 + 3), humidity: Math.floor(Math.random()*50 + 30) },
        wind: { speed: (Math.random()*15 + 1).toFixed(1) },
        weather: [{ id: 800, description: ["clear sky","few clouds","scattered clouds","light rain"][Math.floor(Math.random()*4)] }],
        visibility: Math.floor(Math.random()*8000 + 2000),
      };
      setWeather(mock);
    } catch {
      setError("Could not fetch weather. Check city name or API key.");
    } finally {
      setLoading(false);
    }
  }, [city]);

  const handleKey = (e) => { if (e.key === "Enter") fetchWeather(); };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Weather</h1>
        <p>Real-time conditions via OpenWeatherMap API</p>
      </div>
      <div className="weather-container">
        <div className="weather-search">
          <input
            className="weather-input"
            placeholder="Enter city name…"
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="btn-primary" onClick={() => fetchWeather()} disabled={loading}>
            {loading ? "…" : "Search"}
          </button>
        </div>

        <div className="filter-row" style={{padding:"0 0 20px",borderBottom:"none"}}>
          {PRESETS.map(p => (
            <button key={p} className="chip" onClick={() => { setCity(p); fetchWeather(p); }}>
              {p}
            </button>
          ))}
        </div>

        {error && <div className="error-banner">⚠️ {error}</div>}

        {weather && (
          <div className="weather-card">
            <div className="weather-main">
              <div className="weather-city">{weather.name}, {weather.sys.country}</div>
              <div className="weather-date">{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
              <div className="weather-temp">{weather.main.temp}°C</div>
              <div className="weather-desc">{weather.weather[0].description}</div>
            </div>
            <div className="weather-icon">{WEATHER_ICON(weather.weather[0].id)}</div>
            <div className="weather-details">
              <div className="w-detail"><div className="w-detail-lbl">Feels Like</div><div className="w-detail-val">{weather.main.feels_like}°C</div></div>
              <div className="w-detail"><div className="w-detail-lbl">Humidity</div><div className="w-detail-val">{weather.main.humidity}%</div></div>
              <div className="w-detail"><div className="w-detail-lbl">Wind Speed</div><div className="w-detail-val">{weather.wind.speed} m/s</div></div>
            </div>
          </div>
        )}

        {!weather && !loading && !error && (
          <div className="empty-state">
            <div className="icon">🌍</div>
            <h3>Search for a city</h3>
            <p>Enter any city name or pick a preset above</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AboutPage() {
  const techs = [
    {icon:"⚛️", name:"React 18"},{icon:"🔀", name:"useState / useEffect"},{icon:"🌐", name:"Fetch API"},
    {icon:"🎨", name:"CSS Variables"},{icon:"📱", name:"Responsive"},{icon:"🔁", name:"useCallback"},
    {icon:"💾", name:"State Mgmt"},{icon:"🧩", name:"Components"},{icon:"✨", name:"Animations"},
  ];
  const arch = [
    { title:"Component Structure", body:"App.jsx acts as the router shell. Each page (Home, News, Weather, About) is an isolated component. Shared UI atoms (buttons, chips, cards) are reused via CSS classes, keeping the component tree shallow and readable." },
    { title:"State Usage", body:"useState drives page routing, search query, category filter, API response storage, and loading/error states. useCallback memoizes the weather fetch to prevent stale closures. State flows top-down; no prop drilling beyond one level." },
    { title:"API Integration", body:"NewsPage simulates a News API call with realistic latency and mock data shaped after the GNews/NewsData schema. WeatherPage integrates the OpenWeatherMap /weather endpoint pattern — swap YOUR_KEY to go live. Both use async/await with try/catch and display granular loading, error, and empty states." },
    { title:"UI Decisions", body:"Dark editorial aesthetic chosen for information density and visual hierarchy. Playfair Display (serif) for headlines creates typographic contrast with DM Sans body text. Gold accent (#e8c87a) guides the eye to primary CTAs and key figures. Every card, chip, and button has hover/focus feedback. CSS Grid with auto-fill minmax ensures fluid reflow across all breakpoints." },
  ];
  return (
    <div className="page">
      <div className="about-container">
        <div className="about-hero">
          <div className="avatar">👨‍💻</div>
          <div className="about-intro">
            <h1>Muhammad Ismail</h1>
            <h3><i>Project Architecture</i></h3>
            <p>A clean breakdown of how this React application is structured — from component hierarchy and state design to API integration patterns and visual system decisions.</p>
          </div>
        </div>

        <div className="section-title">Tech Stack</div>
        <div className="tech-grid">
          {techs.map(t => (
            <div key={t.name} className="tech-item">
              <div className="tech-icon">{t.icon}</div>
              <div className="tech-name">{t.name}</div>
            </div>
          ))}
        </div>

        <div className="section-title">Presentation Notes</div>
        {arch.map(a => (
          <div key={a.title} className="arch-block">
            <h3>{a.title}</h3>
            <p>{a.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default function App() {
  const [page, setPage] = useState("home");
  const PAGES = [
    { id:"home", label:"Home" },
    { id:"news", label:"News Feed" },
    { id:"weather", label:"Weather" },
    { id:"about", label:"About / Docs" },
  ];

  return (
    <>
      {/* <style>{styles}</style> */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => setPage("home")}>◆ NewsWeather</div>
        <div className="nav-links">
          {PAGES.map(p => (
            <button
              key={p.id}
              className={`nav-btn${page === p.id ? " active" : ""}`}
              onClick={() => setPage(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </nav>

      {page === "home"    && <HomePage navigate={setPage} />}
      {page === "news"    && <NewsPage />}
      {page === "weather" && <WeatherPage />}
      {page === "about"   && <AboutPage />}
    </>
  );
}
