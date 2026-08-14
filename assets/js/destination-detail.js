/* =========================================
   SMART TRIP PLANNER
   DESTINATION DETAIL
========================================= */


/* =========================================
   EXTRA INFORMATION
========================================= */

const destinationDetails = {

    1: {

        cost: "2 - 4 triệu",

        weather: "18°C - 25°C",

        bestTime: "Tháng 11 - 3",

        activities: [
            "Check-in tại hồ Xuân Hương",
            "Tham quan quảng trường Lâm Viên",
            "Khám phá chợ đêm Đà Lạt",
            "Tham quan các vườn hoa",
            "Săn mây và ngắm bình minh"
        ]

    },


    2: {

        cost: "3 - 5 triệu",

        weather: "24°C - 32°C",

        bestTime: "Tháng 3 - 8",

        activities: [
            "Tắm biển Mỹ Khê",
            "Tham quan Bà Nà Hills",
            "Khám phá bán đảo Sơn Trà",
            "Check-in cầu Rồng",
            "Thưởng thức đặc sản Đà Nẵng"
        ]

    },


    3: {

        cost: "4 - 7 triệu",

        weather: "25°C - 32°C",

        bestTime: "Tháng 11 - 4",

        activities: [
            "Tắm biển và ngắm hoàng hôn",
            "Lặn ngắm san hô",
            "Khám phá đảo bằng cano",
            "Tham quan chợ đêm",
            "Check-in Sunset Town"
        ]

    },


    4: {

        cost: "3 - 5 triệu",

        weather: "25°C - 32°C",

        bestTime: "Tháng 2 - 8",

        activities: [
            "Tắm biển Nha Trang",
            "Khám phá VinWonders",
            "Lặn biển ngắm san hô",
            "Tham quan Hòn Mun",
            "Thưởng thức hải sản"
        ]

    },


    5: {

        cost: "2 - 4 triệu",

        weather: "15°C - 25°C",

        bestTime: "Tháng 3 - 5",

        activities: [
            "Ngắm ruộng bậc thang",
            "Chinh phục Fansipan",
            "Khám phá bản Cát Cát",
            "Đi tàu hỏa leo núi",
            "Săn mây tại đèo Ô Quy Hồ"
        ]

    },


    6: {

        cost: "2 - 4 triệu",

        weather: "20°C - 32°C",

        bestTime: "Tháng 10 - 4",

        activities: [
            "Tham quan Hồ Gươm",
            "Khám phá phố cổ",
            "Tham quan Văn Miếu",
            "Thưởng thức ẩm thực đường phố",
            "Check-in phố sách"
        ]

    },


    7: {

        cost: "2 - 4 triệu",

        weather: "23°C - 30°C",

        bestTime: "Tháng 2 - 7",

        activities: [
            "Khám phá phố cổ Hội An",
            "Thả đèn hoa đăng",
            "Đi thuyền trên sông Hoài",
            "Tham quan làng rau Trà Quế",
            "Thưởng thức cao lầu"
        ]

    },


    8: {

        cost: "2 - 4 triệu",

        weather: "18°C - 28°C",

        bestTime: "Tháng 10 - 4",

        activities: [
            "Tham quan đồi chè",
            "Check-in mùa hoa",
            "Khám phá thác Dải Yếm",
            "Đi bản làng",
            "Cắm trại giữa thiên nhiên"
        ]

    }

};



/* =========================================
   GET ID FROM URL
========================================= */

const params =
    new URLSearchParams(window.location.search);


const destinationId =
    Number(params.get("id"));



/* =========================================
   FIND DESTINATION
========================================= */

const destination =
    destinations.find(
        item => item.id === destinationId
    );



/* =========================================
   DOM
========================================= */

const detailHeroImage =
    document.getElementById("detailHeroImage");

const breadcrumbName =
    document.getElementById("breadcrumbName");

const detailTag =
    document.getElementById("detailTag");

const detailName =
    document.getElementById("detailName");

const detailLocation =
    document.getElementById("detailLocation");

const detailRating =
    document.getElementById("detailRating");

const detailDescription =
    document.getElementById("detailDescription");

const detailCost =
    document.getElementById("detailCost");

const detailWeather =
    document.getElementById("detailWeather");

const detailBestTime =
    document.getElementById("detailBestTime");

const sidebarCost =
    document.getElementById("sidebarCost");

const activityList =
    document.getElementById("activityList");

const addPlannerBtn =
    document.getElementById("addPlannerBtn");



/* =========================================
   CHECK DATA
========================================= */

if (!destination) {

    document.title =
        "Không tìm thấy địa điểm";

    detailName.textContent =
        "Không tìm thấy địa điểm";

    detailDescription.textContent =
        "Địa điểm bạn đang tìm kiếm không tồn tại.";

} else {

    renderDetail();

}



/* =========================================
   RENDER DETAIL
========================================= */

function renderDetail() {

    const extra =
        destinationDetails[destination.id];


    /* Page title */

    document.title =
        `${destination.name} - Smart Trip Planner`;


    /* Hero image */

    detailHeroImage.src =
        destination.image;

    detailHeroImage.alt =
        destination.name;


    detailHeroImage.onerror =
        function () {

            this.src =
                "assets/images/placeholder.jpg";

        };


    /* Basic information */

    breadcrumbName.textContent =
        destination.name;

    detailTag.textContent =
        destination.tag;

    detailName.textContent =
        destination.name;

    detailLocation.textContent =
        destination.location;

    detailRating.textContent =
        destination.rating;

    detailDescription.textContent =
        destination.description;


    /* Extra information */

    if (extra) {

        detailCost.textContent =
            extra.cost;

        detailWeather.textContent =
            extra.weather;

        detailBestTime.textContent =
            extra.bestTime;

        sidebarCost.textContent =
            extra.cost;


        /* Activities */

        activityList.innerHTML =
            extra.activities
                .map(activity => {

                    return `

                        <div class="activity-item">

                            <i class="fa-solid fa-circle-check"></i>

                            <span>
                                ${activity}
                            </span>

                        </div>

                    `;

                })
                .join("");

    }

}



/* =========================================
   ADD TO PLANNER
========================================= */

if (addPlannerBtn) {

    addPlannerBtn.addEventListener(
        "click",
        function () {

            if (!destination) return;


            /* Save selected destination */

            localStorage.setItem(
                "selectedDestination",
                JSON.stringify(destination)
            );


            /* Save extra information */

            localStorage.setItem(
                "selectedDestinationDetail",
                JSON.stringify(
                    destinationDetails[destination.id]
                )
            );


            /* Change button */

            this.innerHTML = `

                <i class="fa-solid fa-check"></i>

                Đã thêm vào lịch trình

            `;


            this.style.background =
                "#10b981";


            /* Go to planner after short delay */

            setTimeout(() => {

                window.location.href =
                    "planner.html";

            }, 700);

        }
    );

}