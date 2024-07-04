document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username && password) {
            localStorage.setItem(username, password);
            alert("Registrazione completata!");
            window.location.href = "index.html";
        } else {
            alert("Per favore, compila tutti i campi.");
        }
    });
});