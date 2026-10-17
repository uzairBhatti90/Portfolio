
// ========== MOBILE NAVIGATION ==========

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        });
    });
}


// ========== EXPANDABLE PROJECT CARDS ==========

document.querySelectorAll(".read-more-btn").forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".project-card");
        const details = card.querySelector(".project-details");

        const isExpanded =
            button.getAttribute("aria-expanded") === "true";

        details.classList.toggle("show", !isExpanded);

        button.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        button.querySelector("span").textContent = isExpanded
            ? "Read project details"
            : "Show less";

        const icon = button.querySelector("i");

        icon.className = isExpanded
            ? "fa-solid fa-plus"
            : "fa-solid fa-minus";
    });
});


// ========== FOOTER COPYRIGHT YEAR ==========

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ========== UNFINISHED SOCIAL LINKS ==========

document.querySelectorAll("[data-placeholder='true']").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        alert(
            "Please replace this placeholder with your real " +
            "LinkedIn profile URL or email address."
        );
    });
});


// ========== NAVIGATION ACTIVE STATE ==========

const sections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll(
    ".nav-links a[href^='#']"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            sectionLinks.forEach(link => {
                const matches =
                    link.getAttribute("href") ===
                    "#" + entry.target.id;

                if (matches) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        });
    }, {
        rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach(section => observer.observe(section));
}
