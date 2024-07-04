document.addEventListener("DOMContentLoaded", function () {
    const joinGameForm = document.getElementById("joinGameForm");

    joinGameForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const gameCode = document.getElementById("gameCode").value;

        if (username && gameCode && localStorage.getItem(username)) {
            alert("Hai acceduto alla partita con codice: " + gameCode);
            // Logica per accedere alla partita (da implementare)
        } else {
            alert("Nome utente o codice partita non validi.");
        }
    });
});