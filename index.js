document.getElementById("FormCred").addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = document.getElementById("btn-submit");
  const formData = new FormData();

  formData.append("_subject", "Novo Lead - Via site!");
  formData.append("_captcha", "false");

  formData.append("Nome", document.getElementById("Nome").value);

  formData.append("Email", document.getElementById("Email").value);

  formData.append("Telefone", document.getElementById("Telefone").value);

  formData.append("Empresa", document.getElementById("Empresa").value);

  formData.append("CNPJ", document.getElementById("CNPJ").value);

  formData.append("Faturamento", document.getElementById("Faturamento").value);

  btn.textContent = "Enviando...";
  btn.disabled = true;

  const textZap =
    "Olá, acabei de preencher o formulário no site. Tenho interesse no serviço e gostaria de entender como podemos começar.";

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/edu.franco2811@gmail.com",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (data.success) {
      Toastify({
        text: "Sua mensagem foi enviada com sucesso, em breve nosso time entrará em contato!",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

      document.getElementById("FormCred").reset();
    } else {
      throw new Error("Erro no envio");
    }
  } catch (error) {
    console.error(error);

    Toastify({
      text: "Houve um erro no envio da mensagem",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #ff4e50, #f00000)",
      },
    }).showToast();
  } finally {
    btn.disabled = false;
    btn.textContent = "Enviar";
  }
});

/* ── Lucide icons ── */
lucide.createIcons();

/* ── Header scroll ── */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

/* ── Mobile menu ── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));
function closeMobileMenu() {
  mobileMenu.classList.remove("open");
}

/* ── Simulator ── */
let prazoSelecionado = 30;
const taxaPorPrazo = { 30: 0.0195, 60: 0.039, 90: 0.0585 };

function formatBRL(val) {
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function updateSim(val) {
  const v = Number(val);
  document.getElementById("simValor").value = v.toLocaleString("pt-BR");
  calcSim(v);
}

function calcSim(v) {
  const taxa = taxaPorPrazo[prazoSelecionado];
  const liquido = v * (1 - taxa);
  const resultEl = document.getElementById("simResult");
  const prev = parseFloat(resultEl.dataset.raw || 50000 * (1 - 0.0195));
  resultEl.dataset.raw = liquido;

  // GSAP number counter on simulator result
  gsap.to(
    { val: prev },
    {
      val: liquido,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function () {
        resultEl.textContent = formatBRL(this.targets()[0].val);
      },
    },
  );

  document.getElementById("simTaxa").textContent =
    `Taxa estimada: ${(taxa * 100).toFixed(2)}% para ${prazoSelecionado} dias • IOF: zero`;
}

function selectPrazo(btn, dias) {
  prazoSelecionado = dias;
  document
    .querySelectorAll(".prazo-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
  calcSim(Number(document.getElementById("simRange").value));
}

// Init
calcSim(50000);
document.getElementById("simResult").dataset.raw = 50000 * (1 - 0.0195);

/* ── GSAP ANIMATIONS ── */
gsap.registerPlugin(ScrollTrigger);

// ── Hero entrance ──
const heroTl = gsap.timeline({ delay: 0.15 });
heroTl
  .from(".hero-tag", { opacity: 0, y: 24, duration: 0.6, ease: "power3.out" })
  .from(
    ".hero-title",
    { opacity: 0, y: 32, duration: 0.7, ease: "power3.out" },
    "-=.35",
  )
  .from(
    ".hero-desc",
    { opacity: 0, y: 24, duration: 0.6, ease: "power3.out" },
    "-=.45",
  )
  .from(
    ".hero-ctas",
    { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" },
    "-=.4",
  )
  .from(
    ".trust-badges",
    { opacity: 0, y: 16, duration: 0.5, ease: "power3.out" },
    "-=.35",
  )
  .from(
    ".sim-card",
    { opacity: 0, x: 40, duration: 0.8, ease: "power3.out" },
    "-=.6",
  );

// ── Decorative rings pulse ──
gsap.to(".hero-deco-ring--lg", {
  scale: 1.04,
  duration: 6,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
gsap.to(".hero-deco-ring--sm", {
  scale: 1.06,
  duration: 4.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  delay: 0.8,
});

// ── Benefit cards stagger ──
gsap.from(".benefit-card", {
  scrollTrigger: { trigger: "#solucoes", start: "top 75%" },
  opacity: 0,
  y: 48,
  duration: 0.65,
  stagger: 0.12,
  ease: "power3.out",
});

// ── Steps stagger ──
gsap.from(".step", {
  scrollTrigger: { trigger: "#como-funciona", start: "top 75%" },
  opacity: 0,
  y: 40,
  duration: 0.6,
  stagger: 0.18,
  ease: "power3.out",
});

// Step connectors slide in
gsap.from(".step-connector", {
  scrollTrigger: { trigger: "#como-funciona", start: "top 75%" },
  scaleX: 0,
  transformOrigin: "left center",
  duration: 0.8,
  stagger: 0.2,
  delay: 0.3,
  ease: "power2.out",
});

// ── Stats card ──
gsap.from(".stats-card", {
  scrollTrigger: { trigger: "#quem-somos", start: "top 75%" },
  opacity: 0,
  x: -48,
  duration: 0.8,
  ease: "power3.out",
});

// Stats value counters
const statValues = [
  {
    el: document.querySelectorAll(".stats-value")[0],
    end: 1200,
    suffix: "+",
    prefix: "",
  },
  {
    el: document.querySelectorAll(".stats-value")[2],
    end: 24,
    suffix: "h",
    prefix: "",
  },
];

ScrollTrigger.create({
  trigger: "#quem-somos",
  start: "top 75%",
  once: true,
  onEnter: () => {
    statValues.forEach(({ el, end, suffix, prefix }) => {
      gsap.to(
        { val: 0 },
        {
          val: end,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent =
              prefix +
              Math.round(this.targets()[0].val).toLocaleString("pt-BR") +
              suffix;
          },
        },
      );
    });
  },
});

// ── About text side ──
gsap.from(".about-text", {
  scrollTrigger: { trigger: "#quem-somos", start: "top 75%" },
  opacity: 0,
  x: 48,
  duration: 0.8,
  delay: 0.15,
  ease: "power3.out",
});

// ── Partners ──
gsap.from(".logo-box", {
  scrollTrigger: { trigger: "#parceiros", start: "top 80%" },
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.07,
  ease: "power2.out",
});
gsap.from(".seal", {
  scrollTrigger: { trigger: ".seals-row", start: "top 85%" },
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out",
});

// ── CTA banner ──
gsap.from(".cta-inner", {
  scrollTrigger: { trigger: "#cta", start: "top 75%" },
  opacity: 0,
  y: 36,
  duration: 0.7,
  ease: "power3.out",
});

// ── Footer grid ──
gsap.from(".footer-grid > *", {
  scrollTrigger: { trigger: "footer", start: "top 90%" },
  opacity: 0,
  y: 24,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out",
});

// ── Parallax on hero rings ──
gsap.to(".hero-deco-ring--lg", {
  scrollTrigger: { trigger: "#hero", scrub: 1 },
  y: 80,
});
gsap.to(".hero-deco-ring--sm", {
  scrollTrigger: { trigger: "#hero", scrub: 1.5 },
  y: 50,
});

// ── Benefit card hover tilt (subtle) ──
document.querySelectorAll(".benefit-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 6,
      rotateX: -y * 6,
      duration: 0.3,
      ease: "power1.out",
      transformPerspective: 800,
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});
