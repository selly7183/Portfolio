"use strict";

//header navbar transparent when it is on the top
const header = document.querySelector("#header");
const headerHeight = header.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
	if (window.scrollY > headerHeight) {
		header.classList.add("header--dark");
	} else {
		header.classList.remove("header--dark");
	}
});

// handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (e) => {
	const target = e.target;
	const link = target.dataset.link;
	if (link == null) {
		return;
	}
	scrollTo(link);
});

// handle click on 'contact me' button on home
const homeContact = document.querySelector(".home__contact");
homeContact.addEventListener("click", () => {
	scrollTo("#contact");
});

// scrolling home background opacity down
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
	home.style.opacity = 1 - window.scrollY / homeHeight;
});

// show scrollTop button when scrolling down
const scrollTop = document.querySelector(".scroll__top");
document.addEventListener("scroll", () => {
	if (window.scrollY > homeHeight / 2) {
		scrollTop.classList.add("on");
	} else {
		scrollTop.classList.remove("on");
	}
});
// handle click on'the scrollTop' button on home
scrollTop.addEventListener("click", () => {
	scrollTo("#home");
});

function scrollTo(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({
		behavior: "smooth",
	});
}
