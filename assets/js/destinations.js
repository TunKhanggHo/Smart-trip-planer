/* =========================================
   SMART TRIP PLANNER
   DESTINATIONS DATA
========================================= */

const destinations = [

    {
        id: 1,

        name: "Đà Lạt",

        location: "Lâm Đồng, Việt Nam",

        category: ["thiên nhiên", "núi"],

        rating: 4.8,

        tag: "Nổi bật",

        image: "assets/images/dalat.jpg",

        description:
            "Thành phố ngàn hoa với khí hậu mát mẻ, cảnh đẹp và nhiều địa điểm check-in hấp dẫn."
    },


    {
        id: 2,

        name: "Đà Nẵng",

        location: "Đà Nẵng, Việt Nam",

        category: ["biển", "thành phố"],

        rating: 4.9,

        tag: "Biển",

        image: "assets/images/danang.jpg",

        description:
            "Thành phố biển năng động với những bãi biển đẹp, ẩm thực hấp dẫn và nhiều địa điểm nổi tiếng."
    },


    {
        id: 3,

        name: "Phú Quốc",

        location: "Kiên Giang, Việt Nam",

        category: ["biển", "thiên nhiên"],

        rating: 4.7,

        tag: "Nghỉ dưỡng",

        image: "assets/images/phu-quoc.jpg",

        description:
            "Đảo ngọc nổi tiếng với biển xanh, cát trắng và những khu nghỉ dưỡng tuyệt đẹp."
    },


    {
        id: 4,

        name: "Nha Trang",

        location: "Khánh Hòa, Việt Nam",

        category: ["biển", "thành phố"],

        rating: 4.7,

        tag: "Biển",

        image: "assets/images/nha-trang.jpg",

        description:
            "Thành phố biển nổi tiếng với những bãi biển trong xanh và nhiều hoạt động vui chơi."
    },


    {
        id: 5,

        name: "Sapa",

        location: "Lào Cai, Việt Nam",

        category: ["núi", "thiên nhiên"],

        rating: 4.8,

        tag: "Núi",

        image: "assets/images/sapa.jpg",

        description:
            "Vùng núi Tây Bắc với ruộng bậc thang, khí hậu mát mẻ và cảnh quan hùng vĩ."
    },


    {
        id: 6,

        name: "Hà Nội",

        location: "Hà Nội, Việt Nam",

        category: ["thành phố"],

        rating: 4.6,

        tag: "Văn hóa",

        image: "assets/images/ha-noi.jpg",

        description:
            "Thủ đô nghìn năm văn hiến với nhiều di tích lịch sử, văn hóa và ẩm thực đặc sắc."
    },


    {
        id: 7,

        name: "Hội An",

        location: "Quảng Nam, Việt Nam",

        category: ["thành phố", "thiên nhiên"],

        rating: 4.9,

        tag: "Nổi bật",

        image: "assets/images/hoi-an.jpg",

        description:
            "Phố cổ yên bình với những ngôi nhà cổ, đèn lồng rực rỡ và nền ẩm thực phong phú."
    },


    {
        id: 8,

        name: "Mộc Châu",

        location: "Sơn La, Việt Nam",

        category: ["núi", "thiên nhiên"],

        rating: 4.7,

        tag: "Thiên nhiên",

        image: "assets/images/moc-chau.jpg",

        description:
            "Vùng cao nguyên xanh mát với đồi chè, hoa và những cung đường tuyệt đẹp."
    }

];


/* =========================================
   DOM ELEMENTS
========================================= */

const destinationGrid =
    document.getElementById("destinationGrid");

const destinationSearch =
    document.getElementById("destinationSearch");

const filterList =
    document.getElementById("filterList");

const resultCount =
    document.getElementById("resultCount");


/* =========================================
   CURRENT FILTER
========================================= */

let currentCategory = "all";

let currentSearch = "";


/* =========================================
   RENDER DESTINATIONS
========================================= */

function renderDestinations() {

    if (!destinationGrid) return;


    /* Filter */

    const filteredDestinations =
        destinations.filter(destination => {

            const matchesCategory =
                currentCategory === "all" ||
                destination.category.includes(currentCategory);


            const keyword =
                currentSearch.toLowerCase();


            const matchesSearch =
                destination.name
                    .toLowerCase()
                    .includes(keyword)

                ||

                destination.location
                    .toLowerCase()
                    .includes(keyword);


            return matchesCategory && matchesSearch;

        });


    /* Update count */

    if (resultCount) {

        resultCount.textContent =
            filteredDestinations.length;

    }


    /* Empty result */

    if (filteredDestinations.length === 0) {

        destinationGrid.innerHTML = `

            <div class="empty-result">

                <i class="fa-regular fa-face-frown"></i>

                <h3>
                    Không tìm thấy địa điểm
                </h3>

                <p>
                    Hãy thử tìm kiếm với từ khóa khác.
                </p>

            </div>

        `;

        return;
    }


    /* Render */

    destinationGrid.innerHTML =
        filteredDestinations
            .map(createDestinationCard)
            .join("");

}


/* =========================================
   CREATE CARD
========================================= */

function createDestinationCard(destination) {

    return `

        <article class="destination-card">

            <div class="destination-image">

                <img
                    src="${destination.image}"
                    alt="${destination.name}"
                    onerror="this.src='assets/images/placeholder.jpg'"
                >

                <span class="destination-tag">
                    ${destination.tag}
                </span>

            </div>


            <div class="destination-content">

                <div class="destination-location">

                    <i class="fa-solid fa-location-dot"></i>

                    ${destination.location}

                </div>


                <h3>
                    ${destination.name}
                </h3>


                <p>
                    ${destination.description}
                </p>


                <div class="destination-footer">

                    <span>

                        <i class="fa-solid fa-star"></i>

                        ${destination.rating}

                    </span>


                    <a
                        href="destination-detail.html?id=${destination.id}"
                    >

                        Xem chi tiết

                        <i class="fa-solid fa-arrow-right"></i>

                    </a>

                </div>

            </div>

        </article>

    `;

}


/* =========================================
   SEARCH
========================================= */

if (destinationSearch) {

    destinationSearch.addEventListener(
        "input",
        function () {

            currentSearch =
                this.value.trim();

            renderDestinations();

        }
    );

}


/* =========================================
   FILTER
========================================= */

if (filterList) {

    filterList.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(".filter-btn");


            if (!button) return;


            /* Remove active */

            document
                .querySelectorAll(".filter-btn")
                .forEach(btn => {

                    btn.classList.remove("active");

                });


            /* Add active */

            button.classList.add("active");


            /* Get category */

            currentCategory =
                button.dataset.category;


            renderDestinations();

        }
    );

}


/* =========================================
   URL SEARCH
   Nhận keyword từ index.html
========================================= */

const urlParams =
    new URLSearchParams(window.location.search);

const urlSearch =
    urlParams.get("search");


if (urlSearch && destinationSearch) {

    destinationSearch.value =
        urlSearch;

    currentSearch =
        urlSearch;

}


/* =========================================
   INITIALIZE
========================================= */

renderDestinations();