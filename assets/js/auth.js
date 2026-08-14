/* =========================================
   SMART TRIP PLANNER
   AUTH.JS
========================================= */


/* =========================================
   REGISTER
========================================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "registerConfirmPassword"
                ).value;


            const error =
                document.getElementById(
                    "registerError"
                );


            const success =
                document.getElementById(
                    "registerSuccess"
                );


            /* CLEAR */

            error.classList.remove("show");

            success.classList.remove("show");


            /* CHECK PASSWORD */

            if (password.length < 6) {

                error.textContent =
                    "Mật khẩu phải có ít nhất 6 ký tự.";

                error.classList.add("show");

                return;

            }


            /* CONFIRM PASSWORD */

            if (
                password !==
                confirmPassword
            ) {

                error.textContent =
                    "Mật khẩu xác nhận không khớp.";

                error.classList.add("show");

                return;

            }


            /* CHECK OLD USER */

            const oldUser =
                localStorage.getItem(
                    "smartTripUser"
                );


            if (oldUser) {

                const user =
                    JSON.parse(
                        oldUser
                    );


                if (
                    user.email.toLowerCase()
                    === email.toLowerCase()
                ) {

                    error.textContent =
                        "Email này đã được đăng ký.";

                    error.classList.add("show");

                    return;

                }

            }


            /* CREATE USER */

            const user = {

                name: name,

                email: email,

                password: password

            };


            localStorage.setItem(
                "smartTripUser",
                JSON.stringify(user)
            );


            /* SUCCESS */

            success.textContent =
                "Đăng ký thành công! Đang chuyển đến trang đăng nhập...";

            success.classList.add("show");


            /* RESET */

            registerForm.reset();


            /* REDIRECT */

            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1500
            );

        }
    );

}



/* =========================================
   LOGIN
========================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const error =
                document.getElementById(
                    "loginError"
                );


            const success =
                document.getElementById(
                    "loginSuccess"
                );


            error.classList.remove("show");

            success.classList.remove("show");


            /* GET USER */

            const savedUser =
                localStorage.getItem(
                    "smartTripUser"
                );


            if (!savedUser) {

                error.textContent =
                    "Tài khoản chưa tồn tại. Vui lòng đăng ký trước.";

                error.classList.add("show");

                return;

            }


            const user =
                JSON.parse(
                    savedUser
                );


            /* CHECK */

            if (
                email.toLowerCase()
                !==
                user.email.toLowerCase()
                ||
                password !== user.password
            ) {

                error.textContent =
                    "Email hoặc mật khẩu không chính xác.";

                error.classList.add("show");

                return;

            }


            /* SAVE LOGIN */

            localStorage.setItem(
                "smartTripLoggedIn",
                "true"
            );


            localStorage.setItem(
                "smartTripCurrentUser",
                JSON.stringify({
                    name: user.name,
                    email: user.email
                })
            );


            /* SUCCESS */

            success.textContent =
                `Xin chào ${user.name}! Đăng nhập thành công.`;

            success.classList.add("show");


            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                1000
            );

        }
    );

}



/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

const passwordButtons =
    document.querySelectorAll(
        ".password-toggle"
    );


passwordButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    button.dataset.target;


                const input =
                    document.getElementById(
                        targetId
                    );


                const icon =
                    button.querySelector(
                        "i"
                    );


                if (
                    input.type ===
                    "password"
                ) {

                    input.type =
                        "text";


                    icon.classList.remove(
                        "fa-eye"
                    );

                    icon.classList.add(
                        "fa-eye-slash"
                    );

                } else {

                    input.type =
                        "password";


                    icon.classList.remove(
                        "fa-eye-slash"
                    );

                    icon.classList.add(
                        "fa-eye"
                    );

                }

            }
        );

    }
);