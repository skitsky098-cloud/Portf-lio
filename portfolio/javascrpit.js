const menuToggle = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");
const themeToggle = document.querySelector("#theme-toggle");
const greeting = document.querySelector("#greeting");
const contactForm = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");

function updateGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    greeting.textContent = "Bom dia! Seja bem-vindo(a).";
  } else if (hour >= 12 && hour < 18) {
    greeting.textContent = "Boa tarde! Seja bem-vindo(a).";
  } else {
    greeting.textContent = "Boa noite! Seja bem-vindo(a).";
  }
}

updateGreeting();

menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

// Modo claro e escuro
function setTheme(isLight) {
  document.documentElement.classList.toggle("light", isLight);

  themeToggle.textContent = isLight ? "🌙" : "☀️";
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Ativar modo escuro" : "Ativar modo claro"
  );
}

themeToggle.addEventListener("click", () => {
  const isLight = !document.documentElement.classList.contains("light");
  setTheme(isLight);
});

// Ano automático
document.querySelector("#year").textContent =
  new Date().getFullYear();

// Validação e feedback do formulário
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
  const consent = document.querySelector("#consent").checked;

  if (!name || !email || !message || !consent) {
    feedback.textContent =
      "Preencha todos os campos e aceite o consentimento.";
    return;
  }

  feedback.textContent =
    `Obrigado, ${name}! Os campos foram validados. ` +
    "Este formulário é demonstrativo e não enviou sua mensagem.";

  contactForm.reset();
});