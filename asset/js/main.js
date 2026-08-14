/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
const navActions = document.querySelector(".nav-actions");

if (menuToggle) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("mobile-open");

        navActions.classList.toggle("mobile-open");

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

}


/* =========================================
   SEARCH
========================================= */

const searchForm = document.getElementById("searchForm");

if (searchForm) {

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const searchInput =
            document.getElementById("searchInput");

        const keyword =
            searchInput.value.trim();

        if (keyword === "") {

            alert("Vui lòng nhập địa điểm bạn muốn tìm.");

            searchInput.focus();

            return;
        }


        /*
            Sau này chúng ta sẽ chuyển sang
            destinations.html và tìm kiếm thật
            bằng destinations.js.
        */

        window.location.href =
            "destinations.html?search=" +
            encodeURIComponent(keyword);

    });

}


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", function () {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});
