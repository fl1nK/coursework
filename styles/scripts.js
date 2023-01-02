document.addEventListener("DOMContentLoaded", () => {

    checkCookie()
    const inputFile = document.querySelectorAll(".upload-file__input");

    /////////// Кнопка «Завантажити PDF файл» ///////////
    inputFile.forEach(function(el) {
        let textSelector = document.querySelector(".upload-file__text");

        // Подія вибору файла
        el.addEventListener("change", function () {
            uploadFile(el.files[0]);
        });

        // Перевіряємо розмір файлу і виводим назву
        const uploadFile = (file) => {

            // файла <2 Мб
            if (file.size > 2 * 1024 * 1024) {
                alert("Файл повинен бути менше 2 МБ.");
                return;
            }
            textSelector.textContent = file.name;
        }
    });
});

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie('username');
    if (user != '') {
        document.getElementById('exit').hidden = false;
        document.getElementById('login').hidden = true;
        document.getElementById('registration').hidden = true;
        document.getElementById('username').textContent = user;
    } else {
        document.getElementById('exit').hidden = true;
        document.getElementById('login').hidden = false;
        document.getElementById('registration').hidden = false;
        document.getElementById('username').textContent = 'Гість';
    }
}
