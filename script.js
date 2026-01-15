document.addEventListener("DOMContentLoaded", () => {

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
  });

  // Projects data
  const projects = [
    {
      title: "Todo App",
      desc: "A simple todo app with local storage.",
      tech: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "Portfolio",
      desc: "Responsive personal portfolio website.",
      tech: ["HTML", "CSS", "JS"]
    },
    {
      title: "API Explorer",
      desc: "Explore REST APIs using Node.js.",
      tech: ["Node.js", "Express"]
    }
  ];

  const grid = document.getElementById("projects-grid");

  projects.forEach(project => {
    const card = document.createElement("article");
    card.className = "card reveal";

    card.innerHTML = `
      <div class="thumb">
        <img src="https://picsum.photos/seed/${project.title}/800/500" alt="${project.title}">
      </div>
      <div class="card-body">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <div class="tech">
          ${project.tech.map(t => `<span class="chip">${t}</span>`).join("")}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
