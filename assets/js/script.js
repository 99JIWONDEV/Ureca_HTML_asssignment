'use strict';

	/* ---------------------------- */
	/* 화면 뜨는 효과 */
	/* ---------------------------- */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



	/* ---------------------------- */
	/* Navbar 토글 */
	/* ---------------------------- */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);


	/* ---------------------------- */
	/* Header Sticky & Back to Time */
	/* ---------------------------- */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



	/* ---------------------------- */
	/* 스크롤 할 때 화면 표시  */
	/* ---------------------------- */
const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.3) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);


  /* ---------------------------- */
const formOpenBtn = document.querySelector("#form-open"),
formContainer = document.querySelector(".form-container"),
formCloseBtn = document.querySelector(".form-close"),
signupBtn = document.querySelector("#signup"),
loginBtn = document.querySelector("#login"),
loginBar =  document.querySelector("[data-login]"),
loginOverlay = document.querySelector("[data-login-overlay]"),
loginTogglers = document.querySelectorAll("[data-login-toggler]"),
pwShowHide = document.querySelectorAll(".pw-hide");

const toggleLoginBar = function () {
  loginOverlay.classList.toggle("active");
}

addEventOnElem(loginTogglers, "click", toggleLoginBar);


formOpenBtn.addEventListener("click", () => {
  formContainer.classList.add("show");
});

formCloseBtn.addEventListener("click", () => {
  formContainer.classList.remove("show");
});

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if(getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    }else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  })
})

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});


const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;
  console.log("Email:", email);
  console.log("Password:", password);
  loginBar.classList.remove("active");
  loginOverlay.classList.remove("active");
  formContainer.classList.remove("show");
  
  // 서버로 데이터 전송
  fetch('https://example.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    formContainer.classList.remove("show");

    alert("로그인 되었습니다.");
  })
  .catch((error) => {
    console.error('Error:', error);
    alert("로그인에 실패했습니다.");
  });
});