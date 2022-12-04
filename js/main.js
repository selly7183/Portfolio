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
// handle click on 'the scrollTop' button on home
scrollTop.addEventListener("click", () => {
	scrollTo("#home");
});

// handle click on 'My work' button filter the item
const workCategory = document.querySelector(".work__categories");
const projectWork = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workCategory.addEventListener("click", (e) => {
	const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
	if (filter == null) {
		return;
	}

	//remove selection from the previous item and select the new one
	const active = document.querySelector(".category__btn.selected");
	active.classList.remove("selected");
	const target =
		e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
	target.classList.add("selected");

	projectWork.classList.add("anim-out");
	setTimeout(() => {
		projects.forEach((project) => {
			if (filter === "*" || filter === project.dataset.type) {
				project.classList.remove("invisible");
			} else {
				project.classList.add("invisible");
			}
		});
		projectWork.classList.remove("anim-out");
	}, 300);
});

function scrollTo(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({
		behavior: "smooth",
	});
}
