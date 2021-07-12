
// Open modal window
let modalSendMail = document.querySelector(".modal-send-mail");
let modalForm = modalSendMail.querySelector(".modal-form")
let contactButton = document.querySelector(".contacts-button");

let closeModalButton = document.querySelector(".close-modal-button");
let nameInput = modalSendMail.querySelector(".sender-username");
let emailInput = modalSendMail.querySelector(".sender-email");
let textInput = modalSendMail.querySelector(".sender-text");

let isStorageSupport = true;
let storageName = "";
let storageEmail = "";

let mapIframe = document.querySelector(".map");

try {
    storageName = localStorage.getItem("name");
    storageEmail = localStorage.getItem("email");
} catch (er) {
    isStorageSupport = false;
}

contactButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    modalSendMail.classList.add("modal-send-active");
    nameInput.focus();
    if (storageName) {
        nameInput.value = storageName;
        emailInput.focus();
    }
    if (storageEmail) {
        emailInput.value = storageEmail;
        textInput.focus();
    }
});

nameInput.addEventListener("input", function(evt) {
    nameInput.classList.remove("no-data");
});

emailInput.addEventListener("input", function(evt) {
    emailInput.classList.remove("no-data");
});

textInput.addEventListener("input", function(evt) {
    textInput.classList.remove("no-data");
});

// Close modal window
closeModalButton.onclick = function() {
    nameInput.value = "";
    emailInput.value = "";
    textInput.value = "";
    modalSendMail.classList.remove("modal-send-active");
    nameInput.classList.remove("no-data");
    emailInput.classList.remove("no-data");
    textInput.classList.remove("no-data");
    modalSendMail.classList.remove("modal-error");
}

modalForm.addEventListener("submit", function(evt) {
    if (nameInput.value == "") {
        evt.preventDefault();
        nameInput.classList.add("no-data");
        modalSendMail.classList.add("modal-error");
    }
    if (emailInput.value == "") {
        evt.preventDefault();
        emailInput.classList.add("no-data");
        modalSendMail.classList.add("modal-error");
    }
    if (textInput.value == "") {
        evt.preventDefault();
        textInput.classList.add("no-data");
        modalSendMail.classList.add("modal-error");
    }

    if (nameInput.value && emailInput.value && textInput.value) {
        localStorage.setItem("name", nameInput.value);
        localStorage.setItem("email", emailInput.value)
    }

});

window.addEventListener("keydown", function(evt) {
    if (evt.key === "Esc" || evt.key === "Escape") {
        if (modalSendMail.classList.contains("modal-send-active")) {
            evt.preventDefault();          
            nameInput.value = "";
            emailInput.value = "";
            textInput.value = "";
            modalSendMail.classList.remove("modal-send-active");
            nameInput.classList.remove("no-data");
            emailInput.classList.remove("no-data");
            textInput.classList.remove("no-data");
            modalSendMail.classList.remove("modal-error");
        }
    }
});



// slides

let slidesList = document.querySelectorAll(".slider-item");
let slidersButtons = document.querySelectorAll(".slider-navigation-button");
let slideId = 0;

for (let i=0; i < slidersButtons.length; i++) {
    slidersButtons[i].addEventListener("click", function(evt) {
        for (let slBtn of slidersButtons) {
            slBtn.classList.remove("slider-nav-button-current");
        }
        slidersButtons[i].classList.add("slider-nav-button-current");
        showSlide(i);
        slidesChange();
    });
};


function showSlide(iSlide) {
    slideId = iSlide;
    if (iSlide >= slidesList.length) {
      slideId = 0;
    }

    if (iSlide < 0) {
        slideId = slidesList.length - 1;
    }
 
    for (let slide of slidesList) {
        slide.classList.remove("slide-current");
    }
    slidesList[slideId].classList.add("slide-current");    
  }

function setButton(iButton) {
    buttonId = iButton;
    if (iButton >= slidersButtons.length) {
        buttonId = 0;
    }

    if (iButton < 0) {
        buttonId = slidersButtons.length - 1;
    }

    for (let sliderButton of slidersButtons) {
        sliderButton.classList.remove("slider-nav-button-current");
    }
    slidersButtons[buttonId].classList.add("slider-nav-button-current");
}

let timer = 0;
function slidesChange() {
    clearInterval(timer);
    timer = setInterval(function() {
        slideId++;
        showSlide(slideId);
        setButton(slideId);
    }, 5000)
}

slidesChange();

