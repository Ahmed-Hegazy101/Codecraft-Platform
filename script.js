const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("open");
  menuToggle.setAttribute(
    "aria-expanded",
    navMenu.classList.contains("open"),
  );
});

const navLinks = document.querySelectorAll(".nav-links a");
const pageSections = document.querySelectorAll(".page-section");

function setActiveLink(sectionId) {
  for (let i = 0; i < navLinks.length; i++) {
    const active = navLinks[i].getAttribute("href") === "#" + sectionId;
    navLinks[i].classList.toggle("active", active);
    if (active) {
      navLinks[i].setAttribute("aria-current", "page");
    } else {
      navLinks[i].removeAttribute("aria-current");
    }
  }
}

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    setActiveLink(navLinks[i].getAttribute("href").substring(1));
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
}

function updateActiveLink() {
  let sectionId = "home";

  for (let i = 0; i < pageSections.length; i++) {
    if (window.scrollY + 110 >= pageSections[i].offsetTop) {
      sectionId = pageSections[i].id;
    }
  }

  setActiveLink(sectionId);
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("resize", updateActiveLink);
updateActiveLink();

const frontendTab = document.getElementById("frontendTab");
const backendTab = document.getElementById("backendTab");
const mobileTab = document.getElementById("mobileTab");
const frontendCourses = document.getElementById("frontendCourses");
const backendCourses = document.getElementById("backendCourses");
const mobileCourses = document.getElementById("mobileCourses");
const previousCourses = document.getElementById("previousCourses");
const nextCourses = document.getElementById("nextCourses");
const coursePageLabel = document.getElementById("coursePageLabel");
let coursePage = 0;

function updateCoursePage() {
  const activePages = document.querySelector(".course-panel.active .course-pages");
  const pages = document.querySelectorAll(".course-panel.active .course-page");
  const lastPage = pages.length - 1;

  if (activePages) {
    activePages.style.transform = "translateX(-" + (coursePage * 100) + "%)";
  }

  coursePageLabel.textContent = "Page " + (coursePage + 1) + " of " + pages.length;
  previousCourses.disabled = coursePage === 0;
  nextCourses.disabled = coursePage === lastPage;
}

function showCourses(track) {
  frontendTab.classList.toggle("active", track === "frontend");
  backendTab.classList.toggle("active", track === "backend");
  mobileTab.classList.toggle("active", track === "mobile");
  frontendCourses.classList.toggle("active", track === "frontend");
  backendCourses.classList.toggle("active", track === "backend");
  mobileCourses.classList.toggle("active", track === "mobile");
  coursePage = 0;
  updateCoursePage();
}

frontendTab.addEventListener("click", function () {
  showCourses("frontend");
});

backendTab.addEventListener("click", function () {
  showCourses("backend");
});

mobileTab.addEventListener("click", function () {
  showCourses("mobile");
});

const roadmapLinks = document.querySelectorAll(".view-roadmap");
for (let i = 0; i < roadmapLinks.length; i++) {
  roadmapLinks[i].addEventListener("click", function () {
    showCourses(roadmapLinks[i].getAttribute("data-track"));
  });
}

previousCourses.addEventListener("click", function () {
  if (coursePage > 0) {
    coursePage = coursePage - 1;
    updateCoursePage();
  }
});

nextCourses.addEventListener("click", function () {
  const pages = document.querySelectorAll(".course-panel.active .course-page");

  if (coursePage < pages.length - 1) {
    coursePage = coursePage + 1;
    updateCoursePage();
  }
});

const modalBackdrop = document.getElementById("modalBackdrop");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const preferredTrack = document.getElementById("preferredTrack");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");
let activeModal = null;
let previousFocus = null;
let previousOverflow = "";
let closeTimer;

function openModal(modalId) {
  window.clearTimeout(closeTimer);

  if (!activeModal) {
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
  }

  loginModal.classList.remove("active");
  registerModal.classList.remove("active");
  activeModal = document.getElementById(modalId);
  activeModal.classList.add("active");
  modalBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  activeModal.querySelector("input").focus();
}

function closeModal() {
  if (!activeModal) {
    return;
  }

  window.clearTimeout(closeTimer);
  activeModal.classList.remove("active");
  modalBackdrop.classList.remove("active");
  document.body.style.overflow = previousOverflow;
  activeModal = null;

  if (previousFocus) {
    previousFocus.focus();
  }
}

document.getElementById("loginButton").addEventListener("click", function () {
  openModal("loginModal");
});

document.getElementById("registerButton").addEventListener("click", function () {
  openModal("registerModal");
});

const startButtons = document.querySelectorAll(".start-track");
for (let i = 0; i < startButtons.length; i++) {
  startButtons[i].addEventListener("click", function () {
    preferredTrack.value = startButtons[i].getAttribute("data-track");
    openModal("registerModal");
  });
}

const closeButtons = document.querySelectorAll(".modal-close");
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", closeModal);
}

const modalSwitchLinks = document.querySelectorAll(".modal-switch");
for (let i = 0; i < modalSwitchLinks.length; i++) {
  modalSwitchLinks[i].addEventListener("click", function (event) {
    event.preventDefault();
    openModal(modalSwitchLinks[i].getAttribute("href").substring(1));
  });
}

modalBackdrop.addEventListener("click", function (event) {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

registerPassword.addEventListener("input", function () {
  confirmPassword.setCustomValidity("");
});

confirmPassword.addEventListener("input", function () {
  if (registerPassword.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords do not match.");
  } else {
    confirmPassword.setCustomValidity("");
  }
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("loginStatus").textContent =
    "This demo sign-in is ready to connect to an account service.";
  closeTimer = window.setTimeout(closeModal, 1800);
});

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (registerPassword.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords do not match.");
    confirmPassword.reportValidity();
    return;
  }

  confirmPassword.setCustomValidity("");
  document.getElementById("registerStatus").textContent =
    "This demo registration is ready to connect to an account service.";
  closeTimer = window.setTimeout(closeModal, 1800);
});

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("contactStatus").textContent =
    "Thanks for your message. This demo form is ready to connect to email.";
});
