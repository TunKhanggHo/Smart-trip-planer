/* =========================================
   SMART TRIP PLANNER
   ITINERARY.JS
========================================= */


/* =========================================
   DOM
========================================= */

const emptyItinerary =
    document.getElementById(
        "emptyItinerary"
    );

const tripPage =
    document.getElementById(
        "tripPage"
    );

const savedItinerary =
    document.getElementById(
        "savedItinerary"
    );

const deleteTripBtn =
    document.getElementById(
        "deleteTripBtn"
    );



/* =========================================
   FORMAT MONEY
========================================= */

function formatMoney(number) {

    return new Intl.NumberFormat(
        "vi-VN"
    ).format(number) + " VNĐ";

}



/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "";

    }


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "vi-VN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}



/* =========================================
   ADD DAYS
========================================= */

function addDays(
    dateString,
    number
) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    date.setDate(
        date.getDate() + number
    );


    return date.toLocaleDateString(
        "vi-VN",
        {
            day: "2-digit",
            month: "2-digit"
        }
    );

}



/* =========================================
   DESTINATION ACTIVITIES
========================================= */

function getActivities(
    destination
) {

    const defaultActivities = [

        {
            time: "08:00",
            icon: "fa-car",
            title: "Khởi hành",
            description:
                "Bắt đầu hành trình khám phá điểm đến."
        },

        {
            time: "10:00",
            icon: "fa-camera",
            title: "Tham quan",
            description:
                "Khám phá địa điểm nổi bật và chụp ảnh."
        },

        {
            time: "12:00",
            icon: "fa-utensils",
            title: "Ăn trưa",
            description:
                "Thưởng thức món ăn đặc sản địa phương."
        },

        {
            time: "14:00",
            icon: "fa-map-location-dot",
            title: "Khám phá",
            description:
                "Tiếp tục khám phá những địa điểm thú vị."
        },

        {
            time: "18:00",
            icon: "fa-moon",
            title: "Ăn tối & nghỉ ngơi",
            description:
                "Dùng bữa tối và nghỉ ngơi."
        }

    ];


    const activities = {

        "Đà Lạt": [

            {
                time: "08:00",
                icon: "fa-car",
                title: "Khởi hành",
                description:
                    "Bắt đầu hành trình khám phá thành phố ngàn hoa."
            },

            {
                time: "09:30",
                icon: "fa-camera",
                title: "Hồ Xuân Hương",
                description:
                    "Đi dạo và check-in tại hồ Xuân Hương."
            },

            {
                time: "12:00",
                icon: "fa-utensils",
                title: "Ăn trưa",
                description:
                    "Thưởng thức các món đặc sản Đà Lạt."
            },

            {
                time: "14:00",
                icon: "fa-leaf",
                title: "Tham quan vườn hoa",
                description:
                    "Khám phá những vườn hoa nổi tiếng."
            },

            {
                time: "19:00",
                icon: "fa-moon",
                title: "Chợ đêm Đà Lạt",
                description:
                    "Thưởng thức ẩm thực đường phố và mua sắm."
            }

        ],


        "Đà Nẵng": [

            {
                time: "08:00",
                icon: "fa-car",
                title: "Khởi hành",
                description:
                    "Bắt đầu ngày mới tại thành phố biển."
            },

            {
                time: "09:30",
                icon: "fa-umbrella-beach",
                title: "Biển Mỹ Khê",
                description:
                    "Tắm biển và thư giãn tại bãi biển Mỹ Khê."
            },

            {
                time: "12:00",
                icon: "fa-utensils",
                title: "Ăn trưa",
                description:
                    "Thưởng thức đặc sản địa phương."
            },

            {
                time: "14:00",
                icon: "fa-mountain",
                title: "Bà Nà Hills",
                description:
                    "Khám phá Bà Nà Hills và Cầu Vàng."
            },

            {
                time: "19:00",
                icon: "fa-city",
                title: "Khám phá thành phố",
                description:
                    "Check-in cầu Rồng và khám phá Đà Nẵng về đêm."
            }

        ],


        "Phú Quốc": [

            {
                time: "08:00",
                icon: "fa-sun",
                title: "Bắt đầu ngày mới",
                description:
                    "Ăn sáng và chuẩn bị khám phá đảo."
            },

            {
                time: "09:30",
                icon: "fa-umbrella-beach",
                title: "Bãi biển",
                description:
                    "Tận hưởng biển xanh và cát trắng."
            },

            {
                time: "12:00",
                icon: "fa-utensils",
                title: "Ăn trưa",
                description:
                    "Thưởng thức hải sản tươi ngon."
            },

            {
                time: "14:30",
                icon: "fa-water",
                title: "Lặn ngắm san hô",
                description:
                    "Khám phá thế giới dưới biển."
            },

            {
                time: "17:30",
                icon: "fa-sun",
                title: "Ngắm hoàng hôn",
                description:
                    "Tận hưởng khung cảnh hoàng hôn tuyệt đẹp."
            }

        ],


        "Sapa": [

            {
                time: "07:30",
                icon: "fa-mountain",
                title: "Khám phá Sapa",
                description:
                    "Bắt đầu ngày mới giữa núi rừng Tây Bắc."
            },

            {
                time: "09:00",
                icon: "fa-person-hiking",
                title: "Bản Cát Cát",
                description:
                    "Khám phá bản làng và văn hóa địa phương."
            },

            {
                time: "12:00",
                icon: "fa-utensils",
                title: "Ăn trưa",
                description:
                    "Thưởng thức món ăn đặc sản vùng cao."
            },

            {
                time: "14:00",
                icon: "fa-mountain",
                title: "Fansipan",
                description:
                    "Khám phá nóc nhà Đông Dương."
            },

            {
                time: "18:30",
                icon: "fa-moon",
                title: "Nghỉ ngơi",
                description:
                    "Thư giãn và tận hưởng không khí Sapa."
            }

        ],

        "Nha Trang": [

            {
                time: "08:00",
                icon: "fa-sun",
                title: "Bãi biển Nha Trang",
                description:
                    "Tận hưởng buổi sáng tại bãi biển."
            },

            {
                time: "10:00",
                icon: "fa-water",
                title: "VinWonders",
                description:
                    "Khám phá khu vui chơi và giải trí."
            },

            {
                time: "12:00",
                icon: "fa-utensils",
                title: "Ăn trưa",
                description:
                    "Thưởng thức hải sản và đặc sản địa phương."
            },

            {
                time: "14:30",
                icon: "fa-ship",
                title: "Tour đảo",
                description:
                    "Khám phá những hòn đảo tuyệt đẹp."
            },

            {
                time: "18:30",
                icon: "fa-moon",
                title: "Khám phá thành phố",
                description:
                    "Dạo biển và thưởng thức ẩm thực buổi tối."
            }

        ],

        "Hà Nội": [

            {
                time: "08:00",
                icon: "fa-mug-hot",
                title: "Ăn sáng",
                description:
                    "Thưởng thức một bữa sáng đặc trưng Hà Nội."
            },

            {
                time: "09:30",
                icon: "fa-landmark",
                title: "Hồ Hoàn Kiếm",
                description:
                    "Tham quan khu vực trung tâm thủ đô."
            },

            {
                time: "12:00",
                icon: "fa-utensils",
                title: "Ăn trưa",
                description:
                    "Thưởng thức phở và các món đặc sản."
            },

            {
                time: "14:00",
                icon: "fa-building-columns",
                title: "Văn Miếu",
                description:
                    "Khám phá di tích lịch sử nổi tiếng."
            },

            {
                time: "19:00",
                icon: "fa-city",
                title: "Phố cổ Hà Nội",
                description:
                    "Dạo phố và khám phá ẩm thực Hà Nội."
            }

        ]

    };


    return (
        activities[destination]
        || defaultActivities
    );

}



/* =========================================
   CREATE DAY HTML
========================================= */

function createDay(
    dayNumber,
    date,
    activities
) {

    const activityHTML =
        activities.map(
            activity => {

                return `

                    <div class="saved-activity">

                        <div class="activity-time">
                            ${activity.time}
                        </div>


                        <div class="activity-icon">

                            <i
                                class="fa-solid ${activity.icon}"
                            ></i>

                        </div>


                        <div class="activity-content">

                            <h4>
                                ${activity.title}
                            </h4>

                            <p>
                                ${activity.description}
                            </p>

                        </div>

                    </div>

                `;

            }
        ).join("");


    return `

        <article class="saved-day">


            <div class="saved-day-header">


                <div class="saved-day-title">

                    <div class="saved-day-number">

                        ${dayNumber}

                    </div>


                    <div>

                        <h3>
                            Ngày ${dayNumber}
                        </h3>

                        <span>
                            ${date}
                        </span>

                    </div>

                </div>


                <div class="day-label">

                    <i class="fa-solid fa-circle-check"></i>

                    Đã lên lịch

                </div>

            </div>


            <div class="saved-activities">

                ${activityHTML}

            </div>

        </article>

    `;

}



/* =========================================
   SMART NOTE
========================================= */

function createSmartNote(
    budget,
    days,
    people
) {

    const perPerson =
        budget / people;

    const perDay =
        budget / days;


    if (perPerson < 1000000) {

        return `
            Ngân sách hiện tại ở mức tiết kiệm.
            Hệ thống ưu tiên các hoạt động
            tham quan và ăn uống có chi phí hợp lý.
        `;

    }


    if (perPerson >= 3000000) {

        return `
            Ngân sách khá thoải mái.
            Bạn có thể cân nhắc nâng cấp
            nơi lưu trú hoặc thêm các trải nghiệm
            đặc biệt vào chuyến đi.
        `;

    }


    if (perDay < 1000000) {

        return `
            Hệ thống đang cân đối ngân sách
            theo từng ngày để hạn chế chi tiêu
            vượt quá kế hoạch.
        `;

    }


    return `
        Lịch trình được cân bằng giữa
        tham quan, ăn uống, nghỉ ngơi
        và ngân sách của chuyến đi.
    `;

}



/* =========================================
   LOAD SAVED TRIP
========================================= */

function loadTrip() {


    const savedTrip =
        localStorage.getItem(
            "savedTrip"
        );


    /* =========================
       NO TRIP
    ========================= */

    if (!savedTrip) {

        emptyItinerary.style.display =
            "flex";

        tripPage.classList.remove(
            "show"
        );

        return;

    }


    let trip;


    try {

        trip =
            JSON.parse(
                savedTrip
            );

    } catch (error) {

        console.error(
            "Dữ liệu lịch trình không hợp lệ:",
            error
        );

        return;

    }



    /* =========================
       SHOW TRIP
    ========================= */

    emptyItinerary.style.display =
        "none";

    tripPage.classList.add(
        "show"
    );



    /* =========================
       BASIC INFO
    ========================= */

    document
        .getElementById(
            "tripDestination"
        )
        .textContent =
        trip.destination;


    document
        .getElementById(
            "tripDate"
        )
        .textContent =
        `${formatDate(trip.startDate)}
         · ${trip.days} ngày`;



    /* =========================
       SUMMARY
    ========================= */

    document
        .getElementById(
            "infoDestination"
        )
        .textContent =
        trip.destination;


    document
        .getElementById(
            "infoDays"
        )
        .textContent =
        `${trip.days} ngày`;


    document
        .getElementById(
            "infoPeople"
        )
        .textContent =
        `${trip.people} người`;


    document
        .getElementById(
            "infoBudget"
        )
        .textContent =
        formatMoney(trip.budget);



    /* =========================
       CREATE DAYS
    ========================= */

    const activities =
        getActivities(
            trip.destination
        );


    let html = "";


    for (
        let i = 0;
        i < trip.days;
        i++
    ) {

        const date =
            addDays(
                trip.startDate,
                i
            );


        html +=
            createDay(
                i + 1,
                date,
                activities
            );

    }


    savedItinerary.innerHTML =
        html;



    /* =========================
       SMART NOTE
    ========================= */

    document
        .getElementById(
            "savedNoteText"
        )
        .textContent =
        createSmartNote(
            trip.budget,
            trip.days,
            trip.people
        );

}



/* =========================================
   DELETE TRIP
========================================= */

if (deleteTripBtn) {

    deleteTripBtn.addEventListener(
        "click",
        function () {


            const confirmDelete =
                confirm(
                    "Bạn có chắc muốn xóa lịch trình này?"
                );


            if (!confirmDelete) {

                return;

            }


            localStorage.removeItem(
                "savedTrip"
            );

            localStorage.removeItem(
                "currentTrip"
            );


            tripPage.classList.remove(
                "show"
            );


            emptyItinerary.style.display =
                "flex";

        }
    );

}



/* =========================================
   LOAD
========================================= */

loadTrip();