/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose && navMenu) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  // When we click on each nav__link, we remove the show-menu class
  if (navMenu) navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));
document
  .querySelectorAll(".nav__dropdown-link")
  .forEach((n) => n.addEventListener("click", linkAction));

const dropdownToggles = document.querySelectorAll(".nav__dropdown-toggle");
const closeDropdowns = () => {
  document.querySelectorAll(".nav__item--dropdown").forEach((item) => {
    item.classList.remove("dropdown-open");
    const toggle = item.querySelector(".nav__dropdown-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
};

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const item = toggle.closest(".nav__item--dropdown");
    if (!item) return;

    const isOpen = item.classList.contains("dropdown-open");
    closeDropdowns();

    if (!isOpen && window.innerWidth < 1150) {
      item.classList.add("dropdown-open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav__item--dropdown")) {
    closeDropdowns();
  }
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () => {
  const header = document.getElementById("header");
  if (!header) return;
  // Add a class if the bottom offset is greater than 50 of the viewport height
  window.scrollY >= 50
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};

window.addEventListener("scroll", bgHeader);
bgHeader();

/*=============== SWIPER SERVICES ===============*/
if (typeof Swiper !== "undefined" && document.querySelector(".services__swiper")) {
  new Swiper(".services__swiper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 24,
    slidesPerView: "auto",

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

/*=============== PROJECT MODAL ===============*/
const projectData = {
  road: {
    category: "Road Infrastructure",
    title: "Nairobi County Road Upgrade",
    location: "Location: Nairobi County, Kenya",
    image: "assets/img/projects-img-1.png",
    details: [
      "<strong>Why roads matter:</strong> Reliable roads reduce travel time, improve public safety, increase access to schools and healthcare, and help local businesses grow by connecting communities more efficiently.",
      "<strong>Our success story:</strong> GEITECH planned the project with careful site preparation, drainage review, grading, compaction, and durable finishing to ensure the road could handle regular traffic and weather conditions.",
      "<strong>What made the result stand out:</strong> We paired strong technical execution with practical project management, keeping quality high and delivery timelines dependable from start to finish."
    ]
  },
  foundation: {
    category: "Residential Construction",
    title: "Residential Foundation Survey",
    location: "Location: Residential construction site",
    image: "assets/img/projects-img-2.png",
    details: [
      "<strong>Why this step matters:</strong> Correct foundation measurement and layout protect the structure from uneven settling, structural weakness, and future costly repairs.",
      "<strong>Our success story:</strong> Our team carried out accurate measurements, verified alignment, and prepared the site so the structure was built on a stable and dependable base.",
      "<strong>What made the result stand out:</strong> Precision at the early stage reduces delay, improves build quality, and gives the client confidence that the project is founded on strong technical planning."
    ]
  },
  flooring: {
    category: "Multi-Storey Structure",
    title: "Storey Building Floor Works",
    location: "Location: Multi-storey construction site",
    image: "assets/img/projects-img-3.png",
    details: [
      "<strong>Why floor works matter:</strong> A well-constructed floor provides structural integrity, a safe working surface, and the stability needed for the rest of the building to perform as designed.",
      "<strong>Our success story:</strong> GEITECH focused on precise concrete preparation, level checking, finishing control, and quality assurance to create a smooth, strong base for the building's ongoing work.",
      "<strong>What made the result stand out:</strong> The finish was not only durable and dependable but also aligned with the overall project requirements, helping create a reliable structure from the ground upward."
    ]
  }
};

const projectModal = document.getElementById("project-modal");
const modalImage = document.getElementById("modal-image");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalLocation = document.getElementById("modal-location");
const modalDetails = document.getElementById("modal-details");
const modalClose = document.querySelector(".project-modal__close");
const projectButtons = document.querySelectorAll(".project__button");

const openProjectModal = (projectKey) => {
  const project = projectData[projectKey];
  if (!project || !projectModal) return;

  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalLocation.textContent = project.location;
  modalDetails.innerHTML = project.details.join("<br><br>");

  if (project.image) {
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalImage.style.display = "block";
  } else {
    modalImage.src = "";
    modalImage.alt = "";
    modalImage.style.display = "none";
  }

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
};

const closeProjectModal = () => {
  if (!projectModal) return;
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
};

projectButtons.forEach((button) => {
  button.addEventListener("click", () => openProjectModal(button.dataset.project));
});

if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) closeProjectModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal && projectModal.classList.contains("is-open")) {
    closeProjectModal();
  }
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUpElement = document.getElementById("scroll-up");
  if (!scrollUpElement) return;
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
  window.scrollY >= 350
    ? scrollUpElement.classList.add("show-scroll")
    : scrollUpElement.classList.remove("show-scroll");
};

window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        '.nav__menu a[href*="' + sectionId + '"]'
      );

    if (!sectionsClass) return;

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== "undefined") {
  const sr = ScrollReveal({
    origin: "top",
    distance: "100px",
    duration: 1500,
    delay: 200,
    // reset: true, // Animation repeat
  });

  sr.reveal(
    ".home__content, .services__data, .services__swiper, .footer__container"
  );
  sr.reveal(".home__images", { origin: "bottom", delay: 500 });
  sr.reveal(".about__images, .contact__img", { origin: "left" });
  sr.reveal(".about__data, .contact__data", { origin: "right" });
  sr.reveal(".projects__card", { interval: 50 });
}
