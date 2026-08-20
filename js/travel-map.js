const SITE_ROOT = (() => {
  const src =
    (document.currentScript && document.currentScript.src) ||
    (document.querySelector("script[src*='travel-map']") || {}).src;
  if (src) return new URL("../", src);
  return new URL("./", window.location.href);
})();

function siteUrl(rel) {
  return new URL(rel, SITE_ROOT).href;
}

function galleryMedia(relDir, files) {
  return files.map((file) => siteUrl(`assets/gallery/${relDir}/${file}`));
}

function galleryPics(relDir, prefix, count) {
  return galleryMedia(
    relDir,
    Array.from({ length: count }, (_, i) => `${prefix}${i + 1}.jpg`)
  );
}

function galleryVids(relDir, prefix, exts) {
  return galleryMedia(
    relDir,
    exts.map((ext, i) => `${prefix}${i + 1}${ext}`)
  );
}

const TRAVEL = [
  {
    name: "Philippines",
    slug: "philippines",
    iso: "PH",
    cities: [
      {
        name: "Batanes",
        slug: "batanes",
        date: "",
        copy: "The northern edge of the archipelago: cliffs, wind, and a slower island clock.",
        lat: 20.4486,
        lng: 121.9702,
        pinLat: 18.52,
        pinLng: 121.95,
        photos: galleryPics("Philippines/Batanes", "Batanespic", 9),
        article: siteUrl("travel.html") + "?country=philippines&city=batanes",
      },
      {
        name: "Boracay",
        slug: "boracay",
        date: "",
        copy: "White Beach and the slow reset between sprints. Home waters.",
        lat: 11.9674,
        lng: 121.9248,
        pinLat: 11.55,
        pinLng: 122.12,
        photos: galleryPics("Philippines/Boracay", "Boracaypic", 13),
        videos: galleryVids("Philippines/Boracay", "boracayvid", [".mp4", ".mp4", ".mp4"]),
        article: siteUrl("travel.html") + "?country=philippines&city=boracay",
      },
      {
        name: "Siargao",
        slug: "siargao",
        date: "",
        copy: "Cloud 9, motorbikes, and days that do not start with a stand-up.",
        lat: 9.8485,
        lng: 126.0458,
        pinLat: 9.45,
        pinLng: 125.52,
        photos: galleryPics("Philippines/Siargao", "Siargaopic", 30),
        videos: galleryVids("Philippines/Siargao", "siargaovid", [
          ".mov",
          ".mov",
          ".mp4",
          ".mp4",
        ]),
        article: siteUrl("travel.html") + "?country=philippines&city=siargao",
      },
      {
        name: "Baguio",
        slug: "baguio",
        date: "",
        copy: "Pine air, hill roads, and a cooler clock than the rest of Luzon.",
        lat: 16.4023,
        lng: 120.596,
        photos: galleryPics("Philippines/Baguio", "Baguiopic", 11),
        article: siteUrl("travel.html") + "?country=philippines&city=baguio",
      },
      {
        name: "Las Casas Filipinas de Acuzar",
        slug: "las-casas-bataan",
        date: "",
        copy: "Heritage houses, brick streets, and a Bataan set that looks older than the weekend.",
        lat: 14.603,
        lng: 120.384,
        photos: galleryPics("Philippines/LasCasas", "LasCasaspic", 13),
        videos: galleryMedia("Philippines/LasCasas", [
          "lascasasvid1.mp4",
          "lascasasvid5.mp4",
        ]),
        article: siteUrl("travel.html") + "?country=philippines&city=las-casas-bataan",
      },
      {
        name: "La Union",
        slug: "la-union",
        date: "",
        copy: "Sunset surf, San Juan sand, and a west-coast pause after the city.",
        lat: 16.6667,
        lng: 120.3333,
        photos: galleryPics("Philippines/LaUnion", "LaUnionpic", 11),
        videos: galleryVids("Philippines/LaUnion", "launionvid", [".mov"]),
        article: siteUrl("travel.html") + "?country=philippines&city=la-union",
      },
      {
        name: "Siquijor",
        slug: "siquijor",
        date: "",
        copy: "Island roads, quiet coves, and a slower Visayas week.",
        lat: 9.2142,
        lng: 123.514,
        pinLat: 9.35,
        pinLng: 123.3,
        photos: galleryPics("Philippines/Siquijor", "Siquijorpic", 16),
        videos: galleryVids("Philippines/Siquijor", "siquijorvid", [
          ".mov",
          ".mov",
          ".mov",
          ".mov",
          ".mov",
          ".mov",
          ".mov",
        ]),
        article: siteUrl("travel.html") + "?country=philippines&city=siquijor",
      },
    ],
  },
  {
    name: "Taiwan",
    slug: "taiwan",
    iso: "CN-TW",
    cities: [
      {
        name: "Taipei",
        slug: "taipei",
        date: "",
        copy: "Night markets, high-speed rail, and a stamp that is not a Jira ticket.",
        lat: 25.033,
        lng: 121.5654,
        pinLat: 24.05,
        pinLng: 121.12,
        photos: galleryPics("Taiwan/Taipei", "Taipeipic", 24),
        videos: galleryVids("Taiwan/Taipei", "taipeivid", [
          ".mp4",
          ".mp4",
          ".mp4",
          ".mp4",
        ]),
        article: siteUrl("travel.html") + "?country=taiwan&city=taipei",
      },
    ],
  },
  {
    name: "Thailand",
    slug: "thailand",
    iso: "TH",
    cities: [
      {
        name: "Bangkok",
        slug: "bangkok",
        date: "",
        copy: "Heat, street food, and a week where the laptop stays in the bag longer than usual.",
        lat: 13.7563,
        lng: 100.5018,
        photos: galleryPics("Thailand/Bangkok", "Bangkokpic", 15),
        videos: galleryVids("Thailand/Bangkok", "bangkokvid", [
          ".mp4",
          ".mp4",
          ".mp4",
          ".mp4",
          ".mp4",
          ".mp4",
          ".mp4",
          ".mp4",
          ".mp4",
          ".mp4",
          ".mp4",
          ".mov",
          ".mov",
        ]),
        article: siteUrl("travel.html") + "?country=thailand&city=bangkok",
      },
      {
        name: "Ayutthaya",
        slug: "ayutthaya",
        date: "",
        copy: "Brick ruins, chedis, and a day trip that still feels like another century.",
        lat: 14.3692,
        lng: 100.5877,
        photos: galleryPics("Thailand/Ayutthaya", "Ayutthayapic", 7),
        videos: galleryVids("Thailand/Ayutthaya", "ayutthayavid", [".mp4", ".mp4"]),
        article: siteUrl("travel.html") + "?country=thailand&city=ayutthaya",
      },
      {
        name: "Pattaya",
        slug: "pattaya",
        date: "",
        copy: "Bay light, a giant city sign, and a coastal stretch east of Bangkok.",
        lat: 12.9236,
        lng: 100.8825,
        pinLat: 13.08,
        pinLng: 100.92,
        photos: galleryPics("Thailand/Pattaya", "Pattayapic", 14),
        videos: galleryVids("Thailand/Pattaya", "pattayavid", [".mp4"]),
        article: siteUrl("travel.html") + "?country=thailand&city=pattaya",
      },
    ],
  },
  {
    name: "Vietnam",
    slug: "vietnam",
    iso: "VN",
    cities: [
      {
        name: "Hanoi",
        slug: "hanoi",
        date: "",
        copy: "Old Quarter alleys, ca phe, and a capital that does not slow down for jet lag.",
        lat: 21.0285,
        lng: 105.8542,
        photos: galleryPics("Vietnam/Hanoi", "Hanoipic", 14),
        videos: galleryVids("Vietnam/Hanoi", "hanoivid", [".mov", ".mov"]),
        article: siteUrl("travel.html") + "?country=vietnam&city=hanoi",
      },
      {
        name: "Da Nang",
        slug: "danang",
        date: "",
        copy: "Coastal city stretch: beach road, bridges, and evenings by the water.",
        lat: 16.0544,
        lng: 108.2022,
        photos: galleryPics("Vietnam/Danang", "Danangpic", 22),
        videos: galleryVids("Vietnam/Danang", "danangvid", [
          ".mov",
          ".mov",
          ".mov",
          ".mov",
          ".mov",
        ]),
        article: siteUrl("travel.html") + "?country=vietnam&city=danang",
      },
      {
        name: "Sapa",
        slug: "sapa",
        date: "",
        copy: "Rice terraces, mountain air, and a slower clock than the cities below.",
        lat: 22.3364,
        lng: 103.8439,
        photos: galleryPics("Vietnam/Sapa", "Sapapic", 37),
        videos: galleryVids("Vietnam/Sapa", "sapavid", [
          ".mov",
          ".mov",
          ".mov",
          ".mov",
          ".mov",
          ".mov",
        ]),
        article: siteUrl("travel.html") + "?country=vietnam&city=sapa",
      },
    ],
  },
];

function getTravelManifest() {
  return { countries: TRAVEL };
}

function travelCities() {
  const list = [];
  getTravelManifest().countries.forEach((country) => {
    (country.cities || []).forEach((city) => {
      list.push({
        ...city,
        country: country.name,
        countrySlug: country.slug,
        iso: country.iso,
      });
    });
  });
  return list;
}

function pinCoord(city) {
  return {
    lat: city.pinLat != null ? city.pinLat : city.lat,
    lng: city.pinLng != null ? city.pinLng : city.lng,
  };
}

function projectPin(lat, lng, svg, layer) {
  const x = ((Number(lng) + 180) / 360) * 1000;
  const y = ((90 - Number(lat)) / 180) * 500;
  const ctm = svg && svg.getScreenCTM && svg.getScreenCTM();
  if (ctm && layer) {
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    const screen = pt.matrixTransform(ctm);
    const box = layer.getBoundingClientRect();
    if (box.width && box.height) {
      return {
        left: ((screen.x - box.left) / box.width) * 100,
        top: ((screen.y - box.top) / box.height) * 100,
      };
    }
  }
  return {
    left: (x / 1000) * 100,
    top: (y / 500) * 100,
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function findTravelEntry() {
  const q = new URLSearchParams(location.search);
  const countryKey = (q.get("country") || "").toLowerCase();
  const cityKey = (q.get("city") || q.get("place") || "").toLowerCase();
  const countries = getTravelManifest().countries;

  if (countryKey && !q.get("city") && !q.get("place")) {
    const country = countries.find((c) => c.slug === countryKey);
    if (country) return { type: "country", country };
  }

  for (const country of countries) {
    if (cityKey && (cityKey === country.slug) && !q.get("city")) {
      return { type: "country", country };
    }
    for (const city of country.cities || []) {
      const hit =
        city.slug === cityKey ||
        city.name.toLowerCase() === cityKey ||
        `${country.slug}/${city.slug}` === cityKey;
      if (!hit) continue;
      if (countryKey && country.slug !== countryKey) continue;
      return { type: "city", country, city };
    }
  }

  if (countries[0]) {
    const city = countries[0].cities && countries[0].cities[0];
    if (city) return { type: "city", country: countries[0], city };
  }
  return null;
}

function initJournalMap() {
  const root = document.getElementById("journal-map");
  if (!root) return;

  const viewport = root.querySelector(".jm-viewport");
  const stage = root.querySelector(".jm-stage");
  const pinsEl = root.querySelector(".jm-pins");
  const worldEl = root.querySelector(".jm-world");
  const card = root.querySelector(".jm-card");
  const hud = root.querySelector(".jm-hud-name");
  const list = document.getElementById("quest-places");
  if (!viewport || !stage || !pinsEl || !worldEl || !card) return;

  const cities = travelCities();

  const cam = { scale: 1, x: 0, y: 0 };
  const minScale = 1;
  const maxScale = 8;
  const labelSide = {
    batanes: "top",
    boracay: "left",
    siargao: "right",
    baguio: "top",
    "las-casas-bataan": "right",
    "la-union": "left",
    siquijor: "bottom",
    taipei: "top",
    bangkok: "left",
    ayutthaya: "top",
    pattaya: "right",
    hanoi: "top",
    danang: "right",
    sapa: "left",
  };

  const applyCam = () => {
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    const minX = w * (1 - cam.scale);
    const minY = h * (1 - cam.scale);
    cam.x = Math.min(0, Math.max(minX, cam.x));
    cam.y = Math.min(0, Math.max(minY, cam.y));
    stage.style.transform = `translate(${cam.x}px, ${cam.y}px) scale(${cam.scale})`;
    const inv = 1 / cam.scale;
    pinsEl.querySelectorAll(".jm-pin").forEach((pin) => {
      pin.style.transform = `translate(-50%, -100%) scale(${inv})`;
    });
  };

  const resetCam = () => {
    cam.scale = 1;
    cam.x = 0;
    cam.y = 0;
    applyCam();
  };

  const zoomAt = (next, cx, cy) => {
    const prev = cam.scale;
    const scale = Math.min(maxScale, Math.max(minScale, next));
    if (scale === prev) return;
    if (scale === 1) {
      resetCam();
      return;
    }
    cam.x = cx - ((cx - cam.x) * scale) / prev;
    cam.y = cy - ((cy - cam.y) * scale) / prev;
    cam.scale = scale;
    applyCam();
  };

  let cardSticky = false;
  let hideTimer = 0;
  let activeSlug = "";

  const closeCard = (force) => {
    if (cardSticky && !force) return;
    window.clearTimeout(hideTimer);
    card.hidden = true;
    cardSticky = false;
    activeSlug = "";
  };

  const scheduleHide = () => {
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => closeCard(false), 200);
  };

  const openCard = (city, sticky) => {
    window.clearTimeout(hideTimer);
    if (sticky) cardSticky = true;
    if (hud) hud.textContent = `${city.name} · ${city.country}`;
    if (activeSlug === city.slug && !card.hidden) return;
    activeSlug = city.slug;
    const photos = (city.photos || [])
      .slice(0, 4)
      .map((src) => `<img src="${src}" alt="">`)
      .join("");
    const date = city.date ? `<p class="jm-card-date">${escapeHtml(city.date)}</p>` : "";
    card.hidden = false;
    card.innerHTML = `
      <button type="button" class="jm-card-close" aria-label="Close">×</button>
      <p class="jm-card-kicker">${escapeHtml(city.country)}</p>
      <h3>${escapeHtml(city.name)}</h3>
      ${date}
      <p class="jm-card-copy">${escapeHtml(city.copy || "Notes from the road.")}</p>
      ${photos ? `<div class="jm-card-photos">${photos}</div>` : ""}
      <a class="jm-card-link" href="${escapeHtml(city.article)}">Open gallery →</a>
    `;
    card.querySelector(".jm-card-close").addEventListener("click", (e) => {
      e.stopPropagation();
      closeCard(true);
    });
  };

  card.addEventListener("pointerenter", () => window.clearTimeout(hideTimer));
  card.addEventListener("pointerleave", scheduleHide);

  const renderPins = () => {
    pinsEl.replaceChildren();
    cities.forEach((city) => {
      const pos = pinCoord(city);
      const { left, top } = projectPin(
        pos.lat,
        pos.lng,
        worldEl.querySelector("svg"),
        pinsEl
      );
      const pin = document.createElement("button");
      pin.type = "button";
      pin.className = `jm-pin jm-pin--${labelSide[city.slug] || "right"}`;
      pin.style.left = `${left}%`;
      pin.style.top = `${top}%`;
      pin.dataset.slug = city.slug;
      pin.setAttribute("aria-label", `${city.name}, ${city.country}`);
      pin.innerHTML = `
        <span class="jm-pin-pulse"></span>
        <span class="jm-pin-mark"></span>
        <span class="jm-pin-label">${escapeHtml(city.name)}</span>
      `;
      pin.addEventListener("pointerenter", () => {
        pinsEl.querySelectorAll(".jm-pin.is-hover").forEach((el) => el.classList.remove("is-hover"));
        pin.classList.add("is-hover");
        openCard(city, false);
      });
      pin.addEventListener("pointerleave", () => {
        pin.classList.remove("is-hover");
        scheduleHide();
      });
      pinsEl.appendChild(pin);
    });
    applyCam();
  };

  const layoutPins = () => {
    pinsEl.querySelectorAll(".jm-pin").forEach((pin) => {
      const city = cities.find((item) => item.slug === pin.dataset.slug);
      if (!city) return;
      const pos = pinCoord(city);
      const { left, top } = projectPin(
        pos.lat,
        pos.lng,
        worldEl.querySelector("svg"),
        pinsEl
      );
      pin.style.left = `${left}%`;
      pin.style.top = `${top}%`;
    });
  };

  const renderCountryCards = () => {
    const track = document.getElementById("place-track") || list;
    if (!track) return;
    const countries = getTravelManifest().countries;
    if (!countries.length) return;

    const tabs = document.getElementById("place-countries");
    const num = document.getElementById("place-num");
    const dots = document.getElementById("place-dots");
    const prev = document.getElementById("place-prev");
    const next = document.getElementById("place-next");
    let slides = [];
    let slideIndex = 0;

    const paint = () => {
      if (num) num.textContent = String(slideIndex + 1).padStart(2, "0");
      if (dots) {
        [...dots.children].forEach((d, i) => d.classList.toggle("is-active", i === slideIndex));
      }
      const cards = [...track.querySelectorAll(".place-slide")];
      const card = cards[slideIndex];
      if (!card) {
        track.style.transform = "translateX(0)";
        return;
      }
      const gap = parseFloat(getComputedStyle(track).gap) || 16;
      const step = card.getBoundingClientRect().width + gap;
      track.style.transform = `translateX(${-(slideIndex * step)}px)`;
    };

    const go = (idx) => {
      if (!slides.length) return;
      slideIndex = (idx + slides.length) % slides.length;
      paint();
    };

    const bindControls = () => {
      if (dots) {
        dots.replaceChildren();
        slides.forEach((city, idx) => {
          const b = document.createElement("button");
          b.type = "button";
          b.setAttribute("aria-label", city.name);
          b.addEventListener("click", () => go(idx));
          dots.appendChild(b);
        });
      }
      if (prev) {
        prev.onclick = (e) => {
          e.preventDefault();
          go(slideIndex - 1);
        };
      }
      if (next) {
        next.onclick = (e) => {
          e.preventDefault();
          go(slideIndex + 1);
        };
      }
    };

    const showCountry = (idx) => {
      const country = countries[idx];
      slides = (country.cities || []).map((city) => ({
        ...city,
        country: country.name,
      }));
      slideIndex = 0;
      if (tabs) {
        [...tabs.children].forEach((tab, i) => {
          tab.classList.toggle("is-active", i === idx);
          tab.setAttribute("aria-selected", i === idx ? "true" : "false");
        });
      }
      track.replaceChildren();
      track.style.transform = "translateX(0)";
      slides.forEach((city) => {
        const cardLink = document.createElement("a");
        cardLink.className = "quest-place place-slide";
        cardLink.href = city.article;
        const thumb = city.photos && city.photos[0]
          ? `<img class="quest-place-thumb" src="${city.photos[0]}" alt="" />`
          : "";
        cardLink.innerHTML = `
          ${thumb}
          <span class="quest-place-tag">${escapeHtml(city.country)}</span>
          <h3>${escapeHtml(city.name)}</h3>
          <p>${escapeHtml(city.copy || "")}</p>
        `;
        track.appendChild(cardLink);
      });
      bindControls();
      requestAnimationFrame(paint);
    };

    if (tabs) {
      tabs.replaceChildren();
      countries.forEach((country, idx) => {
        const tab = document.createElement("button");
        tab.type = "button";
        tab.className = "place-country-tab";
        tab.setAttribute("role", "tab");
        tab.textContent = country.name;
        tab.addEventListener("click", () => showCountry(idx));
        tabs.appendChild(tab);
      });
    }

    showCountry(0);
    window.addEventListener("resize", paint);
  };

  renderCountryCards();
  applyCam();

  const placePins = () => {
    renderPins();
    layoutPins();
  };

  fetch(siteUrl("assets/maps/world.svg"))
    .then((res) => {
      if (!res.ok) throw new Error("map");
      return res.text();
    })
    .then((markup) => {
      worldEl.innerHTML = markup;
      const svg = worldEl.querySelector("svg");
      if (!svg) return;
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      const visited = new Set(
        getTravelManifest().countries.map((country) => country.iso)
      );
      svg.querySelectorAll("[data-iso]").forEach((node) => {
        if (visited.has(node.getAttribute("data-iso"))) {
          node.classList.add("is-visited");
        }
      });
    })
    .catch(() => {
      const img = document.createElement("img");
      img.className = "jm-world-img";
      img.src = siteUrl("assets/maps/world.svg");
      img.alt = "";
      worldEl.replaceChildren(img);
    })
    .finally(() => {
      requestAnimationFrame(() => requestAnimationFrame(placePins));
    });

  if (window.ResizeObserver) {
    new ResizeObserver(() => layoutPins()).observe(viewport);
  } else {
    window.addEventListener("resize", layoutPins);
  }

  root.querySelectorAll("[data-jm]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const action = btn.getAttribute("data-jm");
      const rect = viewport.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      if (action === "in") zoomAt(cam.scale * 1.28, cx, cy);
      if (action === "out") zoomAt(cam.scale / 1.28, cx, cy);
      if (action === "reset") {
        closeCard(true);
        resetCam();
      }
    });
  });

  root.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const rect = viewport.getBoundingClientRect();
      const factor = e.deltaMode === 1 ? 0.08 : 0.0018;
      zoomAt(cam.scale * Math.exp(-e.deltaY * factor), e.clientX - rect.left, e.clientY - rect.top);
    },
    { passive: false }
  );

  let drag = null;

  viewport.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".jm-card, .jm-tools")) return;
    const pin = e.target.closest(".jm-pin");
    drag = {
      x: e.clientX,
      y: e.clientY,
      ox: cam.x,
      oy: cam.y,
      pin,
      moved: false,
    };
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.moved && dx * dx + dy * dy < 36) return;
    drag.moved = true;
    root.classList.add("is-panning");
    cam.x = drag.ox + dx;
    cam.y = drag.oy + dy;
    applyCam();
  });

  const endDrag = (e) => {
    if (!drag) return;
    const wasClick = !drag.moved;
    const pin = drag.pin;
    drag = null;
    root.classList.remove("is-panning");
    if (!wasClick) return;
    if (pin) {
      const city = cities.find((item) => item.slug === pin.dataset.slug);
      if (city) openCard(city, true);
    }
  };

  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);
}

function initTravelGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  const videoWrap = document.getElementById("gallery-videos-wrap");
  const videoGrid = document.getElementById("gallery-videos");
  const entry = findTravelEntry();
  if (!entry) {
    grid.innerHTML = `<p class="world-legend">No photos in this album yet.</p>`;
    return;
  }

  const shots = [];
  const clips = [];
  const title = document.getElementById("gallery-title");
  const tag = document.getElementById("gallery-tag");
  const copy = document.getElementById("gallery-copy");
  const jump = document.getElementById("gallery-jump");

  const pushVideos = (city, countryName) => {
    (city.videos || []).forEach((src, i) => {
      clips.push({
        src,
        type: "video",
        cap: city.name,
        kicker: "Video",
        alt: `${city.name} video ${i + 1}`,
      });
    });
  };

  if (entry.type === "country") {
    if (tag) tag.textContent = "Country";
    if (title) title.textContent = entry.country.name;
    if (copy) {
      copy.textContent = `${entry.country.cities.length} cit${
        entry.country.cities.length === 1 ? "y" : "ies"
      } on this trip.`;
    }
    entry.country.cities.forEach((city) => {
      (city.photos || []).forEach((src, i) => {
        shots.push({
          src,
          type: "photo",
          cap: city.name,
          kicker: entry.country.name,
          alt: `${city.name} ${i + 1}`,
        });
      });
      pushVideos(city, entry.country.name);
    });
  } else {
    const { country, city } = entry;
    if (tag) tag.textContent = country.name;
    if (title) title.textContent = city.name;
    if (copy) copy.textContent = city.copy || "";
    document.title = `${city.name} gallery | Ernest John Maskariño`;
    (city.photos || []).forEach((src, i) => {
      shots.push({
        src,
        type: "photo",
        cap: city.name,
        kicker: country.name,
        alt: `${city.name} ${i + 1}`,
      });
    });
    pushVideos(city, country.name);
  }

  if (jump) {
    const mapLink = document.createElement("a");
    mapLink.href = siteUrl("side-quest.html") + "#travel";
    mapLink.textContent = "← Map";
    jump.appendChild(mapLink);
    getTravelManifest().countries.forEach((country) => {
      country.cities.forEach((city) => {
        const a = document.createElement("a");
        a.href = city.article;
        a.textContent = city.name;
        if (entry.type === "city" && entry.city.slug === city.slug && entry.country.slug === country.slug) {
          a.setAttribute("aria-current", "page");
        }
        jump.appendChild(a);
      });
    });
    if (clips.length) {
      const videoJump = document.createElement("a");
      videoJump.href = "#gallery-videos-wrap";
      videoJump.textContent = "Videos";
      jump.appendChild(videoJump);
    }
  }

  if (!shots.length) {
    grid.innerHTML = `<p class="world-legend">No photos in this album yet.</p>`;
  }

  const box = document.getElementById("lightbox");
  const boxImg = document.getElementById("lightbox-img");
  const boxVid = document.getElementById("lightbox-video");
  const boxCap = document.getElementById("lightbox-cap");
  let reel = [];
  let idx = 0;

  const stopVideo = () => {
    if (!boxVid) return;
    boxVid.pause();
    boxVid.removeAttribute("src");
    boxVid.load();
  };

  const show = (i) => {
    if (!reel.length) return;
    idx = (i + reel.length) % reel.length;
    const item = reel[idx];
    boxCap.textContent = item.cap;
    if (item.type === "video") {
      boxImg.hidden = true;
      boxImg.removeAttribute("src");
      if (boxVid) {
        boxVid.hidden = false;
        boxVid.src = item.src;
        boxVid.play().catch(() => {});
      }
    } else {
      stopVideo();
      if (boxVid) boxVid.hidden = true;
      boxImg.hidden = false;
      boxImg.src = item.src;
      boxImg.alt = item.alt;
    }
  };

  function openShot(list, i) {
    reel = list;
    box.hidden = false;
    document.body.classList.add("nav-lock");
    show(i);
  }

  const close = () => {
    stopVideo();
    box.hidden = true;
    document.body.classList.remove("nav-lock");
  };

  shots.forEach((shot, i) => {
    const cardBtn = document.createElement("button");
    cardBtn.type = "button";
    cardBtn.className = "gallery-shot";
    cardBtn.innerHTML = `
      <span class="gallery-kicker">${escapeHtml(shot.kicker)}</span>
      <img src="${shot.src}" alt="${escapeHtml(shot.alt)}" />
      <span class="gallery-cap">${escapeHtml(shot.cap)}</span>
    `;
    cardBtn.addEventListener("click", () => openShot(shots, i));
    grid.appendChild(cardBtn);
  });

  if (videoWrap && videoGrid && clips.length) {
    videoWrap.hidden = false;
    clips.forEach((clip, i) => {
      const cardBtn = document.createElement("button");
      cardBtn.type = "button";
      cardBtn.className = "gallery-shot gallery-shot-video";
      cardBtn.innerHTML = `
        <span class="gallery-kicker">${escapeHtml(clip.kicker)}</span>
        <video src="${clip.src}" muted playsinline preload="metadata"></video>
        <span class="gallery-play" aria-hidden="true">▶</span>
        <span class="gallery-cap">${escapeHtml(clip.cap)} clip ${String(i + 1).padStart(2, "0")}</span>
      `;
      cardBtn.addEventListener("click", () => openShot(clips, i));
      videoGrid.appendChild(cardBtn);
    });
  }

  document.getElementById("lightbox-close").addEventListener("click", close);
  document.getElementById("lightbox-prev").addEventListener("click", () => show(idx - 1));
  document.getElementById("lightbox-next").addEventListener("click", () => show(idx + 1));
  box.addEventListener("click", (e) => {
    if (e.target === box) close();
  });
  window.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
}
