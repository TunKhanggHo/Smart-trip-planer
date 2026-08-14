/* =========================================
   SMART TRIP PLANNER
   PLANNER.JS
========================================= */


/* =========================================
   DOM
========================================= */

const destinationInput =
    document.getElementById("destinationInput");

const startDate =
    document.getElementById("startDate");

const numberOfDays =
    document.getElementById("numberOfDays");

const numberOfPeople =
    document.getElementById("numberOfPeople");

const budgetInput =
    document.getElementById("budgetInput");

const generateBtn =
    document.getElementById("generateBtn");

const emptyPlanner =
    document.getElementById("emptyPlanner");

const resultHeader =
    document.getElementById("resultHeader");

const resultDescription =
    document.getElementById("resultDescription");

const tripSummary =
    document.getElementById("tripSummary");

const itineraryResult =
    document.getElementById("itineraryResult");

const smartNote =
    document.getElementById("smartNote");

const smartNoteText =
    document.getElementById("smartNoteText");

const saveBtn =
    document.getElementById("saveBtn");

const selectedDestination =
    document.getElementById("selectedDestination");

const selectedDestinationName =
    document.getElementById("selectedDestinationName");



/* =========================================
   SET TODAY AS MIN DATE
========================================= */

if (startDate) {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    startDate.min =
        `${year}-${month}-${day}`;

}



/* =========================================
   LOAD DESTINATION FROM DETAIL PAGE
========================================= */

function loadSelectedDestination() {

    const saved =
        localStorage.getItem(
            "selectedDestination"
        );


    if (!saved) return;


    try {

        const destination =
            JSON.parse(saved);


        if (
            destination &&
            destination.name
        ) {

            destinationInput.value =
                destination.name;


            selectedDestinationName.textContent =
                destination.name;


            selectedDestination.classList.add(
                "show"
            );

        }

    } catch (error) {

        console.error(
            "Không thể đọc địa điểm:",
            error
        );

    }

}


loadSelectedDestination();



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
   GET DESTINATION INFO
========================================= */

function getDestinationInfo(
    destinationName
) {

    const defaultData = {

        activities: [

            {
                time: "08:00",
                icon: "fa-car",
                title: "Khởi hành",
                description:
                    "Bắt đầu hành trình và di chuyển đến điểm tham quan đầu tiên."
            },

            {
                time: "10:00",
                icon: "fa-camera",
                title: "Tham quan",
                description:
                    "Khám phá địa điểm nổi bật và chụp ảnh lưu niệm."
            },

            {
                time: "12:00",
                icon: "fa-utensils",
                title: "Ăn trưa",
                description:
                    "Thưởng thức những món ăn đặc sản địa phương."
            },

            {
                time: "14:00",
                icon: "fa-map-location-dot",
                title: "Khám phá",
                description:
                    "Tiếp tục khám phá các địa điểm nổi tiếng."
            },

            {
                time: "18:00",
                icon: "fa-moon",
                title: "Ăn tối & nghỉ ngơi",
                description:
                    "Dùng bữa tối và nghỉ ngơi sau một ngày khám phá."
            }

        ]

    };


    const destinationData = {

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
                    "Thư giãn và thưởng thức không khí Sapa."
            }

        ]

    };


    return (
        destinationData[destinationName]
        || defaultData.activities
    );

}



/* =========================================
   GENERATE DAY
========================================= */

function createDay(
    dayNumber,
    date,
    activities
) {

    const activitiesForDay =
        activities.map(
            activity => {

                return `

                    <div class="timeline-item">

                        <div class="timeline-time">

                            ${activity.time}

                        </div>


                        <div class="timeline-icon">

                            <i class="fa-solid ${activity.icon}"></i>

                        </div>


                        <div class="timeline-content">

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

        <article class="day-card">


            <div class="day-header">


                <div class="day-title">

                    <div class="day-number">

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


                <div class="day-budget">

                    <i class="fa-solid fa-wallet"></i>

                    Ngân sách ngày

                </div>

            </div>


            <div class="timeline">

                ${activitiesForDay}

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

    const budgetPerDay =
        budget / days;


    const budgetPerPerson =
        budget / people;


    if (budgetPerPerson < 1000000) {

        return `
            Với ngân sách hiện tại,
            hệ thống ưu tiên các hoạt động
            tiết kiệm và hạn chế những trải nghiệm
            có chi phí cao.
        `;

    }


    if (budgetPerPerson >= 3000000) {

        return `
            Ngân sách khá thoải mái.
            Bạn có thể nâng cấp khách sạn,
            thêm hoạt động trải nghiệm
            hoặc thưởng thức các nhà hàng
            đặc sản địa phương.
        `;

    }


    if (budgetPerDay < 1000000) {

        return `
            Hệ thống đang ưu tiên lịch trình
            có chi phí vừa phải để phù hợp
            với ngân sách mỗi ngày.
        `;

    }


    return `
        Lịch trình được cân bằng giữa
        tham quan, ăn uống, nghỉ ngơi
        và ngân sách dự kiến của chuyến đi.
    `;

}



/* =========================================
   GENERATE ITINERARY
========================================= */

function generateItinerary() {


    /* =========================
       GET VALUE
    ========================= */

    const destination =
        destinationInput.value;

    const date =
        startDate.value;

    const days =
        Number(numberOfDays.value);

    const people =
        Number(numberOfPeople.value);

    const budget =
        Number(budgetInput.value);



    /* =========================
       VALIDATION
    ========================= */

    if (!destination) {

        alert(
            "Vui lòng chọn điểm đến!"
        );

        destinationInput.focus();

        return;

    }


    if (!date) {

        alert(
            "Vui lòng chọn ngày đi!"
        );

        startDate.focus();

        return;

    }


    if (!budget || budget < 500000) {

        alert(
            "Ngân sách tối thiểu là 500.000 VNĐ!"
        );

        budgetInput.focus();

        return;

    }



    /* =========================
       LOADING
    ========================= */

    generateBtn.disabled = true;

    generateBtn.innerHTML = `

        <i class="fa-solid fa-spinner fa-spin"></i>

        Đang tạo lịch trình...

    `;



    /* =========================
       CREATE AFTER DELAY
       Tạo cảm giác hệ thống
       đang xử lý thông minh
    ========================= */

    setTimeout(() => {

        const activities =
            getDestinationInfo(
                destination
            );


        let html = "";


        for (
            let i = 0;
            i < days;
            i++
        ) {

            const currentDate =
                addDays(
                    date,
                    i
                );


            html +=
                createDay(
                    i + 1,
                    currentDate,
                    activities
                );

        }



        /* =========================
           HIDE EMPTY
        ========================= */

        emptyPlanner.style.display =
            "none";


        /* =========================
           SHOW RESULT
        ========================= */

        resultHeader.classList.add(
            "show"
        );

        tripSummary.classList.add(
            "show"
        );

        smartNote.style.display =
            "flex";



        /* =========================
           RESULT DESCRIPTION
        ========================= */

        resultDescription.textContent =
            `${days} ngày tại ${destination} · ${people} người`;



        /* =========================
           SUMMARY
        ========================= */

        document
            .getElementById(
                "summaryDestination"
            )
            .textContent =
            destination;


        document
            .getElementById(
                "summaryDays"
            )
            .textContent =
            `${days} ngày`;


        document
            .getElementById(
                "summaryPeople"
            )
            .textContent =
            `${people} người`;


        document
            .getElementById(
                "summaryBudget"
            )
            .textContent =
            formatMoney(budget);



        /* =========================
           ITINERARY
        ========================= */

        itineraryResult.innerHTML =
            html;



        /* =========================
           SMART NOTE
        ========================= */

        smartNoteText.textContent =
            createSmartNote(
                budget,
                days,
                people
            );



        /* =========================
           SAVE CURRENT TRIP
        ========================= */

        const tripData = {

            destination,

            startDate: date,

            days,

            people,

            budget,

            createdAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "currentTrip",
            JSON.stringify(
                tripData
            )
        );



        /* =========================
           RESET BUTTON
        ========================= */

        generateBtn.disabled =
            false;


        generateBtn.innerHTML = `

            <i class="fa-solid fa-wand-magic-sparkles"></i>

            Tạo lại lịch trình

        `;



        /* =========================
           SCROLL RESULT
        ========================= */

        resultHeader.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });


    }, 800);

}



/* =========================================
   GENERATE BUTTON
========================================= */

if (generateBtn) {

    generateBtn.addEventListener(
        "click",
        generateItinerary
    );

}



/* =========================================
   DESTINATION CHANGE
========================================= */

if (destinationInput) {

    destinationInput.addEventListener(
        "change",
        function () {

            if (
                this.value &&
                selectedDestination
            ) {

                selectedDestinationName
                    .textContent =
                    this.value;

                selectedDestination
                    .classList
                    .add("show");

            }

        }
    );

}



/* =========================================
   SAVE TRIP
========================================= */

if (saveBtn) {

    saveBtn.addEventListener(
        "click",
        function () {

            const trip =
                localStorage.getItem(
                    "currentTrip"
                );


            if (!trip) {

                alert(
                    "Bạn chưa tạo lịch trình!"
                );

                return;

            }


            localStorage.setItem(
                "savedTrip",
                trip
            );


            this.innerHTML = `

                <i class="fa-solid fa-check"></i>

                Đã lưu lịch trình

            `;


            this.style.background =
                "#10b981";

            this.style.color =
                "white";


            this.style.borderColor =
                "#10b981";

        }
    );

}