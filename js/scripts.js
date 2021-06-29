// console.log('Привет от JavaScript!');
// Open modal window
let modal_send_mail = document.querySelector('.modal-send-mail');
let modal_form = modal_send_mail.querySelector('.modal-form')
let contact_button = document.querySelector('.contacts-button');

let close_modal_button = document.querySelector('.close-modal-button');
let name_input = modal_send_mail.querySelector('.sender-username');
let email_input = modal_send_mail.querySelector('.sender-email');
let text_input = modal_send_mail.querySelector('.sender-text');

let isStorageSupport = true;
let storage_name = "";
let storage_email = "";

try {
    storage_name = localStorage.getItem('name');
    storage_email = localStorage.getItem('email');
} catch (er) {
    isStorageSupport = false;
}

contact_button.addEventListener("click", function(evt) {
    evt.preventDefault();
    modal_send_mail.classList.add('modal-send-active');
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

name_input.addEventListener('input', function(evt) {
    name_input.classList.remove('no-data');
});

email_input.addEventListener('input', function(evt) {
    email_input.classList.remove('no-data');
});

text_input.addEventListener('input', function(evt) {
    text_input.classList.remove('no-data');
});

// Close modal window
close_modal_button.onclick = function() {
    name_input.value = "";
    email_input.value = "";
    text_input.value = "";
    modal_send_mail.classList.remove('modal-send-active');
    name_input.classList.remove('no-data');
    email_input.classList.remove('no-data');
    text_input.classList.remove('no-data');
    modal_send_mail.classList.remove('modal-error');
}

modal_form.addEventListener('submit', function(evt) {
    if (name_input.value == "") {
        evt.preventDefault();
        name_input.classList.add('no-data');
        modal_send_mail.classList.add('modal-error');
    }
    if (email_input.value == "") {
        evt.preventDefault();
        email_input.classList.add('no-data');
        modal_send_mail.classList.add('modal-error');
    }
    if (text_input.value == "") {
        evt.preventDefault();
        text_input.classList.add('no-data');
        modal_send_mail.classList.add('modal-error');
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
            name_input.classList.remove('no-data');
            email_input.classList.remove('no-data');
            text_input.classList.remove('no-data');
            modal_send_mail.classList.remove('modal-error');
        }
    }
});

