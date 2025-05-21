document.addEventListener("DOMContentLoaded", () => {
  // Title Animation 
  const title = document.getElementById("animated-title");
  if (title) {
    const text = title.textContent;
    title.textContent = "";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animation = `revealChar 0.05s forwards`;
      span.style.animationDelay = `${i * 0.05}s`;
      title.appendChild(span);
    });
  }

  // Mobile Menu Toggle 
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav ul");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Smooth Scroll 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  //Nav Hover Sound 
  const navLinks = document.querySelectorAll("nav a");
  const sound = document.getElementById("menu-sound");
  if (sound) {
    navLinks.forEach(link => {
      link.addEventListener("mouseenter", () => {
        sound.currentTime = 0;
        sound.play();
      });
    });
  }

  // Project Carousel 
  const projects = [
    {
      title: "Project One",
      description: "A simple interactive web project using HTML, CSS, and JavaScript.",
      image: "project1.png",
      alt: "Project 1 screenshot"
    },
    {
      title: "Project Two",
      description: "A Blackjack game built with Python and a user-friendly interface.",
      image: "project2.png",
      alt: "Project 2 screenshot"
    },
    {
      title: "Project Three",
      description: "An art portfolio created for a friend using HTML, CSS, and JavaScript.",
      image: "project3.png",
      alt: "Project 3 screenshot"
    }
  ];

  let currentIndex = 0;

  const projectImage = document.querySelector(".project-image");
  const projectTitle = document.querySelector(".project-title");
  const projectDescription = document.querySelector(".project-description");
  const prevBtn = document.querySelector(".arrow-left");
  const nextBtn = document.querySelector(".arrow-right");

  function updateProject(index) {
    const project = projects[index];
    projectImage.src = project.image;
    projectImage.alt = project.alt;
    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;
  }

  async function animateProjectChange(newIndex) {
    if (!projectImage || !projectTitle || !projectDescription) return;

    projectImage.style.opacity = 0;
    projectTitle.style.opacity = 0;
    projectDescription.style.opacity = 0;

    await new Promise(resolve => setTimeout(resolve, 300));

    updateProject(newIndex);

    projectImage.style.opacity = 1;
    projectTitle.style.opacity = 1;
    projectDescription.style.opacity = 1;
  }

  if (projectImage && projectTitle && projectDescription) {
    projectImage.style.transition = "opacity 0.3s ease";
    projectTitle.style.transition = "opacity 0.3s ease";
    projectDescription.style.transition = "opacity 0.3s ease";
    updateProject(currentIndex); 
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + projects.length) % projects.length;
      animateProjectChange(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % projects.length;
      animateProjectChange(currentIndex);
    });
  }

  // Page Transition Overlay 
  const links = document.querySelectorAll("a[href]");
  const overlay = document.getElementById("transition-overlay");

  links.forEach(link => {
    const url = link.getAttribute("href");
    if (!url.startsWith("#") && !url.startsWith("javascript:")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        if (overlay) overlay.classList.add("transition-active");
        setTimeout(() => {
          window.location.href = this.href;
        }, 600);
      });
    }
  });
});
