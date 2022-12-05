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
	navbarMenu.classList.remove("on");
	scrollTo(link);
	selectNavItem(target);
});

// navbar toggle button
const toggleBtn = document.querySelector(".navbar__toggle-btn");
toggleBtn.addEventListener("click", () => {
	navbarMenu.classList.toggle("on");
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

// skill progressbar
const skill = document.querySelector("#skills");
const skillHeight = skill.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
	if (window.scrollY > skillHeight * 2) {
		skill.classList.add("on");
	} else {
		skill.classList.remove("on");
	}
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

//career mouseover text slide-down
const careerContBox = document.querySelectorAll(".career__box");
const careerDescription = document.querySelectorAll(".career__description");
careerContBox.forEach((box, index) => {
	box.addEventListener("mouseover", () => {
		for (let item of careerDescription) {
			item.classList.remove("slide-down");
			careerDescription[index].classList.add("slide-down");
		}
	});
	box.addEventListener("mouseleave", () => {
		box.classList.remove("slide-down");
	});
});

//career mouseover image show
function handleResize() {
	const width = window.innerWidth;
	if (width > 768) {
		careerContBox.forEach((el) => {
			const image = el.querySelector("img");

			el.addEventListener("mouseenter", (e) => {
				gsap.to(image, { autoAlpha: 1 });
			});

			el.addEventListener("mouseleave", (e) => {
				gsap.to(image, { autoAlpha: 0 });
			});

			el.addEventListener("mousemove", (e) => {
				gsap.set(image, { x: e.offsetX - 0 });
			});
		});
	}
}
window.addEventListener("resize", handleResize);

// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다
const sectionIds = [
	"#home",
	"#about",
	"#skills",
	"#work",
	"#career",
	"#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
	document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
	selectedNavItem.classList.remove("active");
	selectedNavItem = selected;
	selectedNavItem.classList.add("active");
}

function scrollTo(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({
		behavior: "smooth",
	});
	selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
	root: null,
	rootMargin: "0px",
	threshold: 0.3,
};

const observerCallback = (entries, observer) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting && entry.intersectionRatio > 0) {
			const index = sectionIds.indexOf(`#${entry.target.id}`);
			// 스크롤링이 아래로 되어서 페이지가 올라옴
			if (entry.boundingClientRect.y < 0) {
				selectedNavIndex = index + 1;
			} else {
				selectedNavIndex = index - 1;
			}
		}
	});
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
	if (window.scrollY === 0) {
		selectedNavIndex = 0;
	} else if (
		Math.round(window.scrollY + window.innerHeight) >=
		document.body.clientHeight
	) {
		selectedNavIndex = navItems.length - 1;
	}
	selectNavItem(navItems[selectedNavIndex]);
});

// img-ani (bottom-top)
window.onscroll = function () {
	windowScroll();
	window.onscroll = function () {
		const scrollTop = document.documentElement.scrollTop;
		if (scrollTop > 50) {
			windowScroll();
		}
	};
};
function windowScroll() {
	const imgAni = document.querySelectorAll(".img-ani");
	imgAni.forEach((item) => {
		if (item.offsetTop - 500 < document.documentElement.scrollTop) {
			item.classList.add("img-aniload");
		}
	});
}
