/* =========================
     CONFIGURAÇÃO / DADOS
     ========================= */
  const daysOrder = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const START_MIN = 6 * 60;      // 06:00
  const END_MIN   = 20 * 60;     // 20:00
  const TOTAL_MIN = END_MIN - START_MIN;

  // 👉 EDITA AQUI: eventos da semana
  const events = [
    // Blocos Sádhana (dias úteis)
    ...["Ter","Qui",].flatMap(d => ([
      { day: d, title: "Sádhana", start: "06:00", end: "07:00", variant:"" },
      { day: d, title: "Sádhana", start: "18:00", end: "19:00", variant:"asana" },
    ])),

    ...["Seg","Qua","Sex"].flatMap(d => ([
      { day: d, title: "Sádhana", start: "06:00", end: "07:00", variant:"asana" },
      { day: d, title: "Sádhana", start: "18:00", end: "19:00", variant:"" },
    ])),

    ...["Qua","Sex"].flatMap(d => ([
      { day: d, title: "Sádhana", start: "12:45", end: "14:00" },
    ])),

    ...["Seg","Qui"].flatMap(d => ([
      { day: d, title: "Sádhana", start: "12:45", end: "14:00", variant:"asana" },
    ])),


    { day: "Sáb", title: "Sádhana", start: "08:30", end: "10:00", variant:"meditation"  },
    { day: "Qua", title: "Family", start: "17:00", end: "17:30", variant:"family"  },
  ];

  /* =========================
     FUNÇÕES DE APOIO
     ========================= */
  function timeToMinutes(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  }

  function clampToRange(mins) {
    return Math.min(Math.max(mins, START_MIN), END_MIN);
  }

  function minsToPercent(minsFromStart) {
    return (minsFromStart / TOTAL_MIN) * 100;
  }

  /* =========================
     RENDERIZAÇÃO
     ========================= */
  const daysGrid = document.getElementById("days-grid");
  const hourScale = document.getElementById("hour-scale");

  // Cria as colunas dos dias
  daysOrder.forEach(label => {
    const dayCol = document.createElement("div");
    dayCol.className = "day";

    const header = document.createElement("div");
    header.className = "day-header";
    header.textContent = label;

    const body = document.createElement("div");
    body.className = "day-body";

    dayCol.appendChild(header);
    dayCol.appendChild(body);
    daysGrid.appendChild(dayCol);
  });

  // Desenha linhas das horas (lado esquerdo e em cada dia)
  function renderHourLines(container) {
    for (let h = 6; h <= 20; h++) {
      const y = minsToPercent((h * 60) - START_MIN);
      const line = document.createElement("div");
      line.className = "hour-line";
      line.style.top = y + "%";
      container.appendChild(line);

      // labels apenas na coluna das horas (não nos dias)
      if (container === hourScale && h < 20) {
        const label = document.createElement("div");
        label.className = "hour-label";
        label.style.top = y+1.5 + "%";
        label.textContent = (""+h).padStart(2,"0") + ":00";
        container.appendChild(label);
      }
    }
  }
  renderHourLines(hourScale);
  document.querySelectorAll(".day-body").forEach(renderHourLines);

  // Ajusta alturas mínimas para sincronizar visualmente
  const gridHeight = Math.max(550, TOTAL_MIN * 0.5); // 2px por minuto ~ ajustável
  console.log("Grid height:", gridHeight, TOTAL_MIN);
//   hourScale.style.minHeight = gridHeight + "px";
  hourScale.style.height = gridHeight + "px";
  document.querySelectorAll(".day-body").forEach(el => el.style.height = gridHeight + "px");

  // Indexação rápida: mapa de label -> elemento do corpo do dia
  const dayBodies = {};
  document.querySelectorAll(".day").forEach((dayEl, idx) => {
    const label = daysOrder[idx];
    const body = dayEl.querySelector(".day-body");
    dayBodies[label] = body;
  });

  // Renderiza eventos
  events.forEach(ev => {
    const body = dayBodies[ev.day];
    if (!body) return; // ignora dias inválidos

    const startAbs = clampToRange(timeToMinutes(ev.start));
    const endAbs   = clampToRange(timeToMinutes(ev.end));
    if (endAbs <= startAbs) return;

    const topPct = minsToPercent(startAbs - START_MIN);
    const heightPct = minsToPercent(endAbs - startAbs);

    const eventEl = document.createElement("div");
    eventEl.className = "event " + ev.variant;
    eventEl.style.top = topPct + "%";
    eventEl.style.height = heightPct + "%";

    const titleEl = document.createElement("div");
    titleEl.className = "title";
    titleEl.textContent = ev.title || "Evento";

    const descEl = document.createElement("div");
    descEl.className = "description";
    descEl.textContent = ev.variant == "asana" ? "Força & Flexibilidade" :
                          ev.variant == "meditation" ? "Concentração e Meditação" :
                          ev.variant == "family" ? "Yoga em Família" : "";

    const timeEl = document.createElement("div");
    timeEl.className = "time";
    timeEl.textContent = `${ev.start}–${ev.end}`;

    eventEl.appendChild(titleEl);
    // eventEl.appendChild(descEl);
    eventEl.appendChild(timeEl);
    body.appendChild(eventEl);
  });