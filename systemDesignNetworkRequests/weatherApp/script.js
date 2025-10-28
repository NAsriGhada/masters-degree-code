// ============ Open-Meteo setup (no API key needed) ============
const GEO_URL = "https://geocoding-api.open-meteo.com/v1";
const WX_URL = "https://api.open-meteo.com/v1/forecast";

// Elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const geoBtn = document.getElementById("geo-btn");
const statusEl = document.getElementById("status");
const card = document.getElementById("card");

const placeEl = document.getElementById("place");
const descEl = document.getElementById("desc");
const timeEl = document.getElementById("time");
const tempEl = document.getElementById("temp");
const feelsEl = document.getElementById("feels");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");

// WMO weather code → description
const WMO = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

// Utilities
const fmt = (n, d = 0) => (typeof n === "number" ? n.toFixed(d) : "—");
const show = (msg, type = "info") => {
  statusEl.textContent = msg || "";
  statusEl.style.color = type === "error" ? "var(--danger)" : "var(--muted)";
};
const showCard = (on = true) => card.classList.toggle("hidden", !on);

// ============ Geocoding (city → coords) ============
async function geocodeCity(name) {
  const url = `${GEO_URL}/search?name=${encodeURIComponent(name)}&count=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Geocoding failed (${res.status})`);
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found. Check the spelling.");
  }
  const r = data.results[0];
  return {
    name: r.name,
    country: r.country,
    lat: r.latitude,
    lon: r.longitude,
    timezone: r.timezone, // e.g., "Europe/Oslo"
  };
}

// Reverse geocoding (coords → city), for the 📍 button
async function reverseGeocode(lat, lon) {
  const url = `${GEO_URL}/reverse?latitude=${lat}&longitude=${lon}&count=1`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const r = data.results?.[0];
  return r ? { name: r.name, country: r.country, timezone: r.timezone } : null;
}

// ============ Weather fetch (coords → current) ============
async function fetchWeather(lat, lon, tzHint) {
  // We request current + hourly humidity/pressure so we can show extra facts.
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current_weather: "true",
    hourly: "relative_humidity_2m,pressure_msl",
    wind_speed_unit: "ms", // m/s to match the UI
    timezone: tzHint || "auto", // let API pick a good tz if unknown
  });
  const url = `${WX_URL}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather failed (${res.status})`);
  return res.json();
}

// ============ Rendering ============
function renderWeather(geo, wx) {
  // Basic fields
  const cw = wx.current_weather; // { temperature, windspeed, weathercode, time }
  const tz = wx.timezone || geo.timezone || "UTC";
  const when = new Date(cw.time); // already localized to tz from API

  // Derive humidity & pressure closest to current time
  const h = wx.hourly || {};
  const idx = h.time ? h.time.indexOf(cw.time) : -1;
  const humidity =
    idx >= 0 && Array.isArray(h.relative_humidity_2m)
      ? h.relative_humidity_2m[idx]
      : null;
  const pressure =
    idx >= 0 && Array.isArray(h.pressure_msl) ? h.pressure_msl[idx] : null;

  // Populate UI
  placeEl.textContent = `${geo.name}${geo.country ? ", " + geo.country : ""}`;
  descEl.textContent = WMO[cw.weathercode] || "—";
  timeEl.textContent = `Local time: ${when.toLocaleString(undefined, {
    timeZone: tz,
  })}`;

  tempEl.textContent = fmt(cw.temperature, 0);
  feelsEl.textContent = `${fmt(cw.temperature, 0)}°C`; // Open-Meteo has no "feels like", reuse temp
  humidityEl.textContent = `${humidity != null ? fmt(humidity, 0) : "—"}%`;
  windEl.textContent = `${fmt(cw.windspeed, 1)} m/s`;
  pressureEl.textContent = `${pressure != null ? fmt(pressure, 0) : "—"} hPa`;

  showCard(true);
  show(""); // clear status
}

// ============ Orchestrators ============
async function fetchByCity(city) {
  show("Loading…");
  showCard(false);
  try {
    const geo = await geocodeCity(city);
    const wx = await fetchWeather(geo.lat, geo.lon, geo.timezone);
    renderWeather(geo, wx);
  } catch (e) {
    show(e.message || "Something went wrong.", "error");
  }
}

async function fetchByCoords(lat, lon) {
  show("Loading…");
  showCard(false);
  try {
    const rev = await reverseGeocode(lat, lon);
    const name = rev?.name || "Your location";
    const country = rev?.country || "";
    const tz = rev?.timezone;
    const wx = await fetchWeather(lat, lon, tz);
    renderWeather({ name, country, timezone: tz, lat, lon }, wx);
  } catch (e) {
    show(e.message || "Something went wrong.", "error");
  }
}

// ============ Events ============
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  fetchByCity(city);
});

geoBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    show("Geolocation not supported by this browser.", "error");
    return;
  }
  show("Getting your location…");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      fetchByCoords(latitude, longitude);
    },
    (err) => show(err.message || "Could not get location.", "error"),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
});

// Optional: load a default city
fetchByCity("Oslo");
