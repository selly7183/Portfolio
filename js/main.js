"use strict";

//header navbar transparent when it is on the top
const header = document.querySelector("#header");
const headerHeight = header.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
	// console.log(window.scrollY);
	// console.log(`headerHeight: ${headerHeight}`);

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

function scrollTo(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({
		behavior: "smooth",
	});
}

// scrollTop
const scrollTop = document.querySelector(".scroll__top");
scrollTop.addEventListener("click", () => {
	scrollTo("#home");
});
