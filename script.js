document.addEventListener("DOMContentLoaded", function () {
    const createGameForm = document.getElementById("createGameForm");
    const gameCodeContainer = document.getElementById("gameCodeContainer");
    const gameCodeElement = document.getElementById("gameCode");
    const usersList = document.getElementById("users");
    const drawBlackCardButton = document.getElementById("drawBlackCard");
    const currentBlackCard = document.getElementById("currentBlackCard");
    const whiteCardsContainer = document.getElementById("whiteCards");
    const userListContainer = document.getElementById("userList");
    const gameArea = document.getElementById("gameArea");

    const blackCards = [
        "La nuova norma sulla sicurezza ora proibisce __________ sugli aerei.",
        "È un peccato che i ragazzini al giorno d’oggi partecipino a __________.",
        "Qual è il vizio segreto di Batman?"
    ];

    const whiteCards = [
        "Una maledizione di un Gitano.",
        "Un momento di silenzio.",
        "Un festival della salsiccia.",
        "Un poliziotto onesto che non ha niente da perdere.",
        "Carestia.",
        "Batteri Mangia-Carne.",
        "Serpenti volanti che fanno sesso.",
        "Non fregarsene un cazzo del Terzo Mondo.",
        "Sexting.",
        "Benny Benassi.",
        "Pornostar.",
        "Stupro e Saccheggio.",
        "72 vergini.",
        "Sparatoria da auto in corsa.",
        "Un paradosso da viaggio nel tempo.",
        "Cucina autentica messicana.",
        "Gioielli da rapper.",
        "Consulente.",
        "Oberato dai debiti.",
        "Problemi col babbo."
    ];

    createGameForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const usernameInput = document.getElementById("username");
        const username = usernameInput.value.trim();

        if (username !== "") {
            // Genera codice partita
            const gameCode = Math.random().toString(36).substr(2, 5).toUpperCase();
            gameCodeElement.textContent = gameCode;
            gameCodeContainer.classList.remove("hidden");
            userListContainer.classList.remove("hidden");
            gameArea.classList.remove("hidden");

            const listItem = document.createElement("li");
            listItem.textContent = username;
            usersList.appendChild(listItem);

            // Assegna 10 carte bianche all'utente
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * whiteCards.length);
                const whiteCardElement = document.createElement("div");
                whiteCardElement.className = "card white-card";
                whiteCardElement.textContent = whiteCards[randomIndex];
                whiteCardsContainer.appendChild(whiteCardElement);
            }

            usernameInput.value = "";
            createGameForm.style.display = "none";
        }
    });

    drawBlackCardButton.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * blackCards.length);
        currentBlackCard.textContent = blackCards[randomIndex];
    });
});