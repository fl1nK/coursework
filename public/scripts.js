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

            // файла <5 Мб
            if (file.size >  5 * 1024 * 1024) {
                alert("Файл повинен бути менше 5 МБ.");
                document.location.reload();
                return;
            }
            textSelector.textContent = file.name;
        }
    });
});

function removeSpaces(string) {
    return string.split(' ').join('');
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie('username');
    if (user !== '') {
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
