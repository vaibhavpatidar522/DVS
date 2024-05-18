// menu fade animation
const nav = document.querySelector(".nav");
const fadeInOut = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblingLinks = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblingLinks.forEach((element) => {
      if (element != link) element.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener("mouseover", (e) => fadeInOut(e, 0.5));
nav.addEventListener("mouseout", (e) => fadeInOut(e, 1));

///////////////////////////////////////////////////////////////////////////
// sticky navbar

// const initialCoordsofSection1 = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > initialCoordsofSection1.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const observerCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const observerOptions = {
  root: null,
  threshold: 0, //visibility with respect to root-----0 means completely gone
  rootMargin: `-${navHeight}px`, // to stick the nav bar exact to its height
};

const observer = new IntersectionObserver(
  observerCallback,
  observerOptions
).observe(header);

/////////////////////////////////////////////////////////////////////
// revealing sections on scroll

const allSections = document.querySelectorAll(".section");
const revealSectionCallBack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const revealSectionOptions = {
  root: null, //wrt viewport
  threshold: 0.2,
};
const sectionObserver = new IntersectionObserver(
  revealSectionCallBack,
  revealSectionOptions
);

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/////////////////////////////////////////////////////////////////
// lazy loading of images ------------------------------
const imgesToBeLoaded = document.querySelectorAll("img[data-src]");
const loadImageCallBack = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const loadImageOptions = {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
};

const imageObserver = new IntersectionObserver(
  loadImageCallBack,
  loadImageOptions
);

imgesToBeLoaded.forEach((img) => imageObserver.observe(img));

// /////////////////////////////////////////////////////////////////////////////////////////
// /tabbed components

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operation__tab-content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (clicked) {
    // Remove active classes

    tabs.forEach((t) => t.classList.remove("operations__tab--active"));

    // Activate tab
    clicked.classList.add("operations__tab--active");

    // Activate content area
    tabsContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    );
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }
});
