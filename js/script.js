const layers = [
  {
    title: "API Manager / Governance",
    copy: "Policies, SLAs, and access around the APIs — the layer that keeps production support from becoming tribal knowledge.",
  },
  {
    title: "Experience APIs",
    copy: "Channel-shaped contracts. Mobile, portal, or partner consumers get a purpose-built API without talking to core systems directly.",
  },
  {
    title: "Process APIs",
    copy: "Orchestration: Scatter-Gather, JMS, caching, and the business composition that sits between experience and systems of record.",
  },
  {
    title: "System APIs",
    copy: "Canonical access to Shopify, core banking, retail, and department platforms — HTTP standards, fragments, and libraries in Design Center.",
  },
  {
    title: "Runtime / CI/CD / Support",
    copy: "Runtime Manager deploys, pipelines ship faster, MUnit guards regressions, and incident RCA keeps Japan and APAC production stable.",
  },
  {
    title: "Core systems & channels",
    copy: "Shopify, core banking, retail, and department systems that become reusable APIs — Metrobank CDD, Shiseido commerce, Razer AMS, and the channels that consume them.",
  },
];

const projects = [
  {
    cat: "Integration",
    title: "Christian DIOR OMS",
    copy: "MuleSoft integrations for Christian DIOR for the whole OMS life cycle across the globe",
    tools: "Anypoint Platform, API-led connectivity, Mulesoft",
    badge: "July 2026 – Present · Lead Consultant",
  },  
  {
    cat: "Integration",
    title: "Razer AMS",
    copy: "MuleSoft integrations for Razer — design, change requests, and post-production support so the AMS landscape stays current after go-live.",
    tools: "Anypoint Platform, API-led connectivity, CI/CD",
    badge: "Nov 2025 – July 2026 · production support",
  },
  {
    cat: "Integration",
    title: "Shiseido Retail APIs",
    copy: "Japan and EMEA retail APIs on Anypoint, including Shopify and third-party connectors, then APAC post-production support.",
    tools: "MuleSoft, Shopify, Anypoint Studio",
    badge: "Jun 2025 – Dec 2025 · Japan, EMEA, APAC",
  },
  {
    cat: "Banking",
    title: "Core Banking APIs",
    copy: "API-led services for Metrobank CDD. Requirements through Design Center, fragments and libraries, MUnit, SIT / UAT / PROD with client DevOps.",
    tools: "Anypoint Design Center, MUnit, HTTP standards",
    badge: "May 2024 – Oct 2025 · Metrobank CDD",
  },
  {
    cat: "Banking",
    title: "PDDTS ISO 2022 & OTD R6",
    copy: "Batch EOD upgrade for ISO 2022 compliance and ongoing OTD R6 delivery on the Metrobank integration landscape.",
    tools: "Mule 4, batch processing, production releases",
    badge: "Aug 2023 – Oct 2025",
  },
  {
    cat: "Backend",
    title: "eMPF Platform",
    copy: "Systems analysis, API specifications, and Java / Spring / JPA backends for PCCW’s mandatory provident fund work.",
    tools: "Java, Spring, JPA, Hibernate",
    badge: "Sep 2021 – Apr 2022",
  },
  {
    cat: "Fintech",
    title: "GCash Promotions",
    copy: "Promotion-domain APIs on the Ant Group stack: SOFABoot, Alipay, SOFAstack, White Castle, and ESB inside Globe Fintech.",
    tools: "SOFABoot, ESB, REST APIs",
    badge: "Feb 2021 – Sep 2021 · production domain",
  },
  {
    cat: "Hackathon",
    title: "Aluna Real Estate Online Marketplace",
    copy: "Our hackathon entry for the UHACK real estate hackathon 2019",
    tools: "laravel, vue, java, mysql",
    badge: "Sep 2019 · TOP 10",
  },
  {
    cat: "Water Utilities",
    title: "Manila, Laguna, Estate Water Read & Bill Adaptive",
    copy: "Read and bill systems for the water utilities company in the Philippines",
    tools: "Java, Spring, Angular, SQL",
    badge: "Nov 2017 - Feb 2021 · Lead Developer ",
  },
];

const knowledge = [
  {
    keys: ["who", "name", "yourself", "about", "background", "senior", "current", "now", "present"],
    answer:
      "I'm Ernest John Maskariño, a software engineer,Senior MuleSoft Developer, and Senior Integration Consultant working currently as a Lead Consultant at CGI Philippines specializing in APIs, integrations, and enterprise systems. I also have experience in AI through my work as an AI Tutor at xAI, teaching and evaluating Grok. I enjoy freelancing and exploring AI projects that combine technology, automation, and innovation.",
  },
  {
    keys: ["cgi", "christian dior", "lead consultant"],
    answer:
      "At CGI, I work as a Lead Consultant specializing in MuleSoft integrations for Christian Dior across EMEA and global markets. I design and develop integrations between MuleSoft, Dior’s Order Management System (OMS), and various third-party systems, ensuring reliable data flow and seamless connectivity across their technology ecosystem."
  },
  {
    keys: ["viseo", "razer", "shiseido"],
    answer:
      "At Viseo Asia I moved from freelance (Jun–Oct 2025) to Senior MuleSoft Developer (Oct 2025 - July 2026). I integrate MuleSoft with Shopify, support Shiseido in Japan and APAC, design Razer integrations, run CI/CD, handle incidents, and review to MuleSoft standards.",
  },
  {
    keys: ["metrobank", "collabera", "cdd", "banking", "pddts", "otd", "xgate"],
    answer:
      "At Collabera I was deployed to Metropolitan Bank & Trust Co. CDD (Aug 2023–Oct 2025). I designed API-led services in Anypoint Design Center, wrote MUnit tests, and released through SIT, UAT, and PROD. Programs included Core Banking APIs, PDDTS ISO 2022, OTD R6, and XGATE COEX migration.",
  },
  {
    keys: ["capgemini", "retail", "jms", "scatter"],
    answer:
      "At Capgemini (Apr 2022–Aug 2023) I was an Associate Integration Consultant on Central Retail Group. I used Mule patterns such as Object Store caching, ActiveMQ/JMS, and Scatter-Gather, plus MUnit and Runtime Manager.",
  },
  {
    keys: ["gcash", "globe", "sofa", "fintech", "promotion"],
    answer:
      "In 2021 I was a backend developer at Globe Fintech Innovation / GCash via Collabera. I built promotion-domain APIs using SOFABoot, Alipay, SOFAstack, White Castle, and ESB in an agile team.",
  },
  {
    keys: ["empf", "pccw", "spring", "hibernate"],
    answer:
      "At PCCW Solutions (Sep 2021–Apr 2022) I was a solutions / backend developer on the eMPF platform. I produced SAD artifacts and Java backends with Spring, JPA, and Hibernate.",
  },
  {
    keys: ["xai", "grok", "tutor", "tutoring", "llm", "artificial intelligence", "ai tutor", "ai"],
    answer:
      "I have been an AI Tutor at xAI teaching and evaluating Grok to improve its accuracy, reasoning, and response quality. I am still new at this space and eager to gain more experience on this field.",
  },
  {
    keys: ["freelance", "side project", "collaborations"],
    answer:
      "Yes, I do freelancing and collaborations. I previously worked as a freelance developer at VISEO Asia before joining them on a regular basis. I also work on side projects involving AI, including my role as an AI Tutor at xAI. Please let me know if you have a exciting project for us to do :)",
  },
  {
    keys: ["indra", "water", "angular", "intern", "first"],
    answer:
      "INDRA Philippines (Nov 2017–Feb 2021) is where I started as an intern and was absorbed full-time. I built water-industry apps in VB.NET and SQL Server, then Java EE, Angular 4, Spring, and MySQL. I was lead developer on Laguna and Estate Water Read & Bill Adaptive.",
  },
  {
    keys: ["skill", "tech", "stack", "mule", "java", "tool"],
    answer:
      "Core stack: Mule ESB 4, Anypoint Platform, API Manager, RAML, MUnit, Java/Java EE, Spring Boot, SOFABoot, Angular, C#/VB.NET, MySQL, SQL Server, RabbitMQ, Pub/Sub, Git, CI/CD.",
  },
  {
    keys: ["cert", "mulesoft certified", "mcd", "uhack", "education", "pup", "school"],
    answer:
      "MuleSoft Certified Developer Level 1 (June 2022). BS Information Technology from Polytechnic University of the Philippines (2014–2018). Top 10 at UnionBank UHACK Real Estate (Sep 2019) with the Aluna marketplace entry.",
  },
  {
    keys: ["contact", "email", "phone", "linkedin", "reach"],
    answer:
      "Email maskarinoernestjohn@gmail.com, LinkedIn linkedin.com/in/ejmaskarino, phone +63 915 137 3096. Based in the Philippines.",
  },
  {
    keys: ["experience", "year", "how long"],
    answer:
      "I have been a professional software engineer since November 2017 — a bit over eight years — from intern through Senior Integration Consultant.",
  },
];

const startDate = new Date(2017, 10, 1); // November 2018
const currentDate = new Date();

let yearsOfExperience =
  currentDate.getFullYear() - startDate.getFullYear();

if (
  currentDate.getMonth() < startDate.getMonth() ||
  (currentDate.getMonth() === startDate.getMonth() &&
    currentDate.getDate() < startDate.getDate())
) {
  yearsOfExperience--;
}

document.querySelectorAll(".js-years").forEach((el) => {
  el.dataset.target = String(yearsOfExperience);
});

function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  document.body.classList.add("has-custom-cursor");
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  let x = 0;
  let y = 0;
  let rx = 0;
  let ry = 0;
  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
  });
  function follow() {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(follow);
  }
  follow();
}

function initHeader() {
  const header = document.getElementById("header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

function initNav() {
  const header = document.getElementById("header");
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!header || !toggle || !nav) return;

  const close = () => {
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-lock");
  };

  const open = () => {
    header.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-lock");
  };

  toggle.addEventListener("click", () => {
    if (header.classList.contains("nav-open")) close();
    else open();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1024px)").matches) close();
  });
}

function initAccordion() {
  document.querySelectorAll("[data-acc]").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll("[data-acc]").forEach((el) => el.classList.remove("is-open"));
      item.classList.add("is-open");
    });
  });
}

function initLayers() {
  const title = document.getElementById("layer-title");
  const copy = document.getElementById("layer-copy");
  if (!title || !copy) return;
  document.querySelectorAll("#pyramid button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#pyramid button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const layer = layers[Number(btn.dataset.layer)];
      title.textContent = layer.title;
      copy.textContent = layer.copy;
    });
  });
}

function initWork() {
  const content = document.getElementById("work-content");
  const num = document.getElementById("work-num");
  const dots = document.getElementById("work-dots");
  if (!content || !num || !dots) return;
  let i = 0;

  projects.forEach((_, idx) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Go to project ${idx + 1}`);
    b.addEventListener("click", () => {
      i = idx;
      render();
    });
    dots.appendChild(b);
  });

  function render() {
    const p = projects[i];
    num.textContent = String(i + 1).padStart(2, "0");
    content.innerHTML = `
      <p class="work-kicker">${p.cat}</p>
      <h3>${p.title}</h3>
      <p>${p.copy}</p>
      <div class="work-tools"><span>Tools</span><strong>${p.tools}</strong></div>
      <div class="work-badge">${p.badge}</div>
    `;
    [...dots.children].forEach((d, idx) => d.classList.toggle("is-active", idx === i));
  }

  document.getElementById("work-prev").addEventListener("click", () => {
    i = (i - 1 + projects.length) % projects.length;
    render();
  });
  document.getElementById("work-next").addEventListener("click", () => {
    i = (i + 1) % projects.length;
    render();
  });
  render();
}

function initApiLed() {
  const tabs = document.querySelectorAll(".etl-tabs button");
  const arch = document.getElementById("arch");
  const compare = document.getElementById("compare");
  const note = document.getElementById("mode-note");
  if (!arch || !compare || !note) return;
  const notes = {
    ptp: "<strong>In this model:</strong> Every new consumer needs its own mapping, errors, and SLAs.",
    led: "<strong>In this model:</strong> A new consumer reuses process and system layers. Change stays in one place.",
  };

  function setMode(mode) {
    arch.dataset.mode = mode;
    compare.dataset.mode = mode;
    note.innerHTML = notes[mode];
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      setMode(tab.dataset.mode);
    });
  });

  setMode("ptp");
}

function answerQuestion(q) {
  const t = q.toLowerCase();
  let best = null;
  let score = 0;
  knowledge.forEach((item) => {
    const hits = item.keys.filter((k) => t.includes(k.toLowerCase())).length;
    if (hits > score) {
      score = hits;
      best = item.answer;
    }
  });
  return (
    best ||
    "I am so please to connect with you. Please feel free to contact me at maskarinoernestjohn@gmail.com or +63 915 137 3096"
  );
}

function initChat() {
  const modal = document.getElementById("chat-modal");
  const log = document.getElementById("chat-log");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const openBtn = document.getElementById("chat-open");
  if (!modal || !log || !form || !input || !openBtn) return;

  function add(text, who) {
    const el = document.createElement("div");
    el.className = `bubble ${who}`;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  function greet() {
    log.innerHTML = "";
    add("Ask about roles, projects, stack, or contact details. I’ll answer from my CV.", "bot");
    const row = document.createElement("div");
    row.className = "suggest";
    ["Current role?", "Collaborations?", "Tech stack?", "How to reach you?"].forEach((s) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = s;
      b.addEventListener("click", () => ask(s));
      row.appendChild(b);
    });
    log.appendChild(row);
  }

  function ask(q) {
    add(q, "user");
    add(answerQuestion(q), "bot");
  }

  openBtn.addEventListener("click", () => {
    modal.hidden = false;
    greet();
    input.focus();
  });
  document.getElementById("chat-close").addEventListener("click", () => {
    modal.hidden = true;
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.hidden = true;
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    ask(q);
  });
}

initCursor();
initHeader();
initNav();
initAccordion();
initLayers();
initWork();
initApiLed();
initChat();
initMetricRollers();
initDeskStage();
initMeGallery();
initMeTrivia();
if (typeof initJournalMap === "function") initJournalMap();
if (typeof initTravelGallery === "function") initTravelGallery();
initScrollReveal();

function initMeGallery() {
  const root = document.getElementById("me-photos");
  const current = document.getElementById("me-photo-current");
  const peek = document.getElementById("me-photo-next");
  const num = document.getElementById("me-photo-num");
  if (!root || !current || !peek || !num) return;

  const shots = Array.from({ length: 13 }, (_, i) => ({
    src: `assets/images/portraits/ejpic${i + 1}.jpg`,
    alt: "EJ",
  }));

  let idx = 0;

  const paint = () => {
    const now = shots[idx];
    const next = shots[(idx + 1) % shots.length];
    current.src = now.src;
    current.alt = now.alt;
    peek.src = next.src;
    peek.alt = "";
    num.textContent = String(idx + 1).padStart(2, "0");
  };

  const go = (step) => {
    idx = (idx + step + shots.length) % shots.length;
    paint();
  };

  document.getElementById("me-photo-now").addEventListener("click", () => go(1));
  document.getElementById("me-photo-prev").addEventListener("click", (e) => {
    e.stopPropagation();
    go(-1);
  });
  document.getElementById("me-photo-next-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    go(1);
  });

  root.tabIndex = 0;
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });

  paint();
}

function initMeTrivia() {
  const root = document.getElementById("me-trivia");
  const stage = document.getElementById("me-trivia-stage");
  const num = document.getElementById("me-trivia-num");
  const dotsEl = document.getElementById("me-trivia-dots");
  if (!root || !stage || !num || !dotsEl) return;

  const cards = Array.from(stage.querySelectorAll(".me-trivia-card"));
  const total = cards.length;
  if (!total) return;

  let idx = 0;
  let startX = 0;
  let swiped = false;

  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Trivia ${String(i + 1).padStart(2, "0")}`);
    dot.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(dot);
  });

  const dots = Array.from(dotsEl.children);

  const paint = () => {
    cards.forEach((card, i) => {
      card.classList.remove("is-prev", "is-current", "is-next");
      if (i === idx) card.classList.add("is-current");
      else if (i === (idx - 1 + total) % total) card.classList.add("is-prev");
      else if (i === (idx + 1) % total) card.classList.add("is-next");
    });
    dots.forEach((dot, i) => dot.classList.toggle("is-on", i === idx));
    num.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  };

  const goTo = (next) => {
    idx = (next + total) % total;
    paint();
  };

  document.getElementById("me-trivia-prev").addEventListener("click", () => goTo(idx - 1));
  document.getElementById("me-trivia-next").addEventListener("click", () => goTo(idx + 1));
  stage.addEventListener("click", (e) => {
    if (swiped) {
      swiped = false;
      return;
    }
    if (e.target.closest("a")) return;
    if (e.target.closest(".me-trivia-card.is-current")) goTo(idx + 1);
  });
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(idx - 1);
    if (e.key === "ArrowRight") goTo(idx + 1);
  });
  stage.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
  });
  stage.addEventListener("pointerup", (e) => {
    const dx = e.clientX - startX;
    if (Math.abs(dx) < 40) return;
    swiped = true;
    goTo(idx + (dx < 0 ? 1 : -1));
  });

  paint();
}

function initMetricRollers() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = document.querySelectorAll(".js-count");

  counters.forEach((el) => {
    const value = Number(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    if (!Number.isFinite(value)) return;

    el.classList.add("metric-roll");
    el.setAttribute("aria-label", `${value}${suffix}`);
    el.replaceChildren();

    const tracks = String(value).split("").map((digit) => {
      const windowEl = document.createElement("span");
      windowEl.className = "metric-roll-window";
      const strip = document.createElement("span");
      strip.className = "metric-roll-strip";
      for (let n = 0; n < 30; n += 1) {
        const num = document.createElement("span");
        num.textContent = String(n % 10);
        strip.appendChild(num);
      }
      windowEl.appendChild(strip);
      el.appendChild(windowEl);
      return { strip, digit: Number(digit) };
    });

    if (suffix) {
      const mark = document.createElement("span");
      mark.className = "metric-roll-suffix";
      mark.textContent = suffix;
      el.appendChild(mark);
    }

    const land = (animate) => {
      tracks.forEach(({ strip, digit }, i) => {
        const y = animate ? 20 + digit : digit;
        strip.style.transition = animate ? "" : "none";
        strip.style.transform = `translateY(-${y}em)`;
        if (animate) {
          strip.style.transitionDelay = `${i * 90}ms`;
        }
      });
    };

    if (reduce) {
      land(false);
      return;
    }

    el._spin = () => {
      tracks.forEach(({ strip }) => {
        strip.style.transition = "none";
        strip.style.transform = "translateY(0)";
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => land(true));
      });
    };
  });

  const grid = document.querySelector(".metrics-grid");
  if (!grid || reduce) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counters.forEach((el, i) => {
          setTimeout(() => el._spin?.(), i * 140);
        });
        io.disconnect();
      });
    },
    { threshold: 0.35 }
  );

  io.observe(grid);
}

function initDeskStage() {
  const stage = document.getElementById("desk-stage");
  const tilt = document.getElementById("desk-tilt");
  const video = document.getElementById("desk-video");
  const spot = document.getElementById("desk-spot");
  const scrub = document.getElementById("desk-scrub");
  const bar = document.getElementById("desk-scrub-bar");
  const playBtn = document.getElementById("desk-play");
  const muteBtn = document.getElementById("desk-mute");
  const cinemaBtn = document.getElementById("desk-cinema-btn");
  const cinema = document.getElementById("desk-cinema");
  const cinemaFrame = document.getElementById("desk-cinema-frame");
  const cinemaClose = document.getElementById("desk-cinema-close");
  if (!stage || !tilt || !video) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  let playing = false;
  let cinemaOn = false;
  const homeParent = tilt;

  const setPlayUi = () => {
    playBtn.textContent = video.paused ? "Play" : "Pause";
    playBtn.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
  };

  const setMuteUi = () => {
    muteBtn.textContent = video.muted ? "Sound off" : "Sound on";
    muteBtn.classList.toggle("is-on", !video.muted);
    muteBtn.setAttribute("aria-label", video.muted ? "Unmute video" : "Mute video");
  };

  const play = () => {
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
    playing = true;
    setPlayUi();
  };

  const pause = () => {
    video.pause();
    playing = false;
    setPlayUi();
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (cinemaOn) return;
        if (entry.isIntersecting && !reduce) play();
        else pause();
      });
    },
    { threshold: 0.45 }
  );
  io.observe(stage);

  if (fine && !reduce) {
    tilt.addEventListener("mousemove", (e) => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      stage.classList.add("is-hot");
      tilt.style.transform = `rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg)`;
      if (spot) {
        spot.style.setProperty("--sx", `${x * 100}%`);
        spot.style.setProperty("--sy", `${y * 100}%`);
      }
    });
    tilt.addEventListener("mouseleave", () => {
      stage.classList.remove("is-hot");
      tilt.style.transform = "";
    });
  }

  video.addEventListener("timeupdate", () => {
    if (!video.duration) return;
    bar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  });

  const seek = (e) => {
    const r = scrub.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    if (video.duration) video.currentTime = x * video.duration;
  };

  scrub.addEventListener("click", seek);
  scrub.addEventListener("pointerdown", (e) => {
    seek(e);
    const move = (ev) => seek(ev);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  });

  playBtn.addEventListener("click", () => {
    if (video.paused) play();
    else pause();
  });

  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    setMuteUi();
  });

  const openCinema = () => {
    if (!cinema || !cinemaFrame) return;
    cinemaOn = true;
    cinema.classList.add("is-open");
    cinema.removeAttribute("hidden");
    cinemaFrame.appendChild(video);
    play();
    setMuteUi();
    document.body.classList.add("nav-lock");
  };

  const closeCinema = () => {
    cinemaOn = false;
    if (cinema) {
      cinema.classList.remove("is-open");
      cinema.setAttribute("hidden", "");
    }
    homeParent.insertBefore(video, homeParent.firstChild);
    document.body.classList.remove("nav-lock");
  };

  if (cinemaBtn) cinemaBtn.addEventListener("click", openCinema);
  if (cinemaClose) cinemaClose.addEventListener("click", closeCinema);
  if (cinema) {
    cinema.addEventListener("click", (e) => {
      if (e.target === cinema) closeCinema();
    });
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cinemaOn) closeCinema();
  });
  video.addEventListener("click", (e) => {
    e.stopPropagation();
    if (cinemaOn) return;
    if (video.paused) play();
    else pause();
  });

  setPlayUi();
  setMuteUi();
}

function initScrollReveal() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const blocks = [
    ...document.querySelectorAll(".chat-bar-wrap"),
    ...document.querySelectorAll(
      "main > section:not(.hero):not(#contact) > *:not(.no-reveal):not(.desk-cinema)"
    ),
  ];
  const contactBits = [
    document.querySelector("#contact .eyebrow"),
    ...document.querySelectorAll("#contact .contact-grid > div"),
    document.querySelector("#contact footer"),
  ].filter(Boolean);
  contactBits.forEach((el, i) => el.style.setProperty("--d", `${i * 120}ms`));

  const nodes = [...blocks, ...contactBits];
  const dividers = [...document.querySelectorAll(".divider")];

  if (reduce) {
    nodes.forEach((el) => el.classList.add("reveal", "is-in"));
    dividers.forEach((el) => el.classList.add("reveal-icon", "is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -15% 0px" }
  );

  nodes.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });

  dividers.forEach((el) => {
    el.classList.add("reveal-icon");
    io.observe(el);
  });
}
