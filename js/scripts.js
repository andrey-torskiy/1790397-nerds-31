
// Open modal window
let modal_send_mail = document.querySelector(".modal-send-mail");
let modal_form = modal_send_mail.querySelector(".modal-form")
let contact_button = document.querySelector(".contacts-button");

let close_modal_button = document.querySelector(".close-modal-button");
let name_input = modal_send_mail.querySelector(".sender-username");
let email_input = modal_send_mail.querySelector(".sender-email");
let text_input = modal_send_mail.querySelector(".sender-text");

let isStorageSupport = true;
let storage_name = "";
let storage_email = "";

try {
    storage_name = localStorage.getItem("name");
    storage_email = localStorage.getItem("email");
} catch (er) {
    isStorageSupport = false;
}

contact_button.addEventListener("click", function(evt) {
    evt.preventDefault();
    modal_send_mail.classList.add("modal-send-active");
    name_input.focus();
    if (storage_name) {
        name_input.value = storage_name;
        email_input.focus();
    }
    if (storage_email) {
        email_input.value = storage_email;
        text_input.focus();
    }
});

name_input.addEventListener("input", function(evt) {
    name_input.classList.remove("no-data");
});

email_input.addEventListener("input", function(evt) {
    email_input.classList.remove("no-data");
});

text_input.addEventListener("input", function(evt) {
    text_input.classList.remove("no-data");
});

// Close modal window
close_modal_button.onclick = function() {
    name_input.value = "";
    email_input.value = "";
    text_input.value = "";
    modal_send_mail.classList.remove("modal-send-active");
    name_input.classList.remove("no-data");
    email_input.classList.remove("no-data");
    text_input.classList.remove("no-data");
    modal_send_mail.classList.remove("modal-error");
}

modal_form.addEventListener("submit", function(evt) {
    if (name_input.value == "") {
        evt.preventDefault();
        name_input.classList.add("no-data");
        modal_send_mail.classList.add("modal-error");
    }
    if (email_input.value == "") {
        evt.preventDefault();
        email_input.classList.add("no-data");
        modal_send_mail.classList.add("modal-error");
    }
    if (text_input.value == "") {
        evt.preventDefault();
        text_input.classList.add("no-data");
        modal_send_mail.classList.add("modal-error");
    }

    if (name_input.value && email_input.value && text_input.value) {
        localStorage.setItem("name", name_input.value);
        localStorage.setItem("email", email_input.value)
    }

});

window.addEventListener("keydown", function(evt) {
    if (evt.key === "Esc" || evt.key === "Escape") {
        if (modal_send_mail.classList.contains("modal-send-active")) {
            evt.preventDefault();          
            name_input.value = "";
            email_input.value = "";
            text_input.value = "";
            modal_send_mail.classList.remove("modal-send-active");
            name_input.classList.remove("no-data");
            email_input.classList.remove("no-data");
            text_input.classList.remove("no-data");
            modal_send_mail.classList.remove("modal-error");
        }
    }
});



// slides

let slides_list = document.querySelectorAll(".slider-item");
let sliders_buttons = document.querySelectorAll(".slider-navigation-button");
let slide_id = 0;

for (let i=0; i < sliders_buttons.length; i++) {
    sliders_buttons[i].addEventListener("click", function(evt) {
        for (let sl_btn of sliders_buttons) {
            sl_btn.classList.remove("slider-nav-button-current");
        }
        sliders_buttons[i].classList.add("slider-nav-button-current");
        show_slide(i);
        slides_change();
    });
};


function show_slide(i_slide) {
    slide_id = i_slide;
    if (i_slide >= slides_list.length) {
      slide_id = 0;
    }

    if (i_slide < 0) {
        slide_id = slides_list.length - 1;
    }
 
    for (let slide of slides_list) {
        slide.classList.remove("slide-current");
    }
    slides_list[slide_id].classList.add("slide-current");    
  }

function set_button(i_button) {
    button_id = i_button;
    if (i_button >= sliders_buttons.length) {
        button_id = 0;
    }

    if (i_button < 0) {
        button_id = sliders_buttons.length - 1;
    }

    for (let slider_button of sliders_buttons) {
        slider_button.classList.remove("slider-nav-button-current");
    }
    sliders_buttons[button_id].classList.add("slider-nav-button-current");
}

let timer = 0;
function slides_change() {
    clearInterval(timer);
    timer = setInterval(function() {
        slide_id++;
        show_slide(slide_id);
        set_button(slide_id);
    }, 5000)
}

slides_change();