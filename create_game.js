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
    const submitWhiteCardButton = document.getElementById("submitWhiteCard");
    const submittedCardsContainer = document.getElementById("submittedCardsContainer");
    const submittedCards = document.getElementById("submittedCards");
    const selectWinnerContainer = document.getElementById("selectWinnerContainer");
    const submittedCardsForSelection = document.getElementById("submittedCardsForSelection");

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

    let game = {
        players: [],
        blackCard: null,
        whiteCards: [],
        submittedCards: [],
        currentPlayerIndex: 0,
        round: 0,
    };

    createGameForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const usernameInput = document.getElementById("username");
        const username = usernameInput.value.trim();

        if (username !== "" && localStorage.getItem(username)) {
            // Genera codice partita
            const gameCode = Math.random().toString(36).substr(2, 5).toUpperCase();
            gameCodeElement.textContent = gameCode;
            gameCodeContainer.classList.remove("hidden");
            userListContainer.classList.remove("hidden");
            gameArea.classList.remove("hidden");

            game.players.push({ username: username, points: 0 });
            updatePlayerList();

            // Assegna 10 carte bianche all'utente
            game.whiteCards[username] = [];
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * whiteCards.length);
                game.whiteCards[username].push(whiteCards[randomIndex]);
            }
            updateWhiteCards(username);

            usernameInput.value = "";
            createGameForm.style.display = "none";

            // Avvia il gioco
            startGame();
        } else {
            alert("Nome utente non registrato.");
        }
    });

    drawBlackCardButton.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * blackCards.length);
        game.blackCard = blackCards[randomIndex];
        currentBlackCard.textContent = game.blackCard;
        drawBlackCardButton.classList.add("hidden");
        submitWhiteCardButton.classList.remove("hidden");
    });

    submitWhiteCardButton.addEventListener("click", function () {
        const selectedCard = document.querySelector('input[name="whiteCard"]:checked');
        if (selectedCard) {
            const selectedCardText = selectedCard.value;
            game.submittedCards.push({ player: game.players[game.currentPlayerIndex].username, card: selectedCardText });

            if (game.submittedCards.length === game.players.length - 1) {
                showSubmittedCards();
            } else {
                nextTurn();
            }
        } else {
            alert("Seleziona una carta bianca.");
        }
    });

    function startGame() {
        game.round = 1;
        game.currentPlayerIndex = 0;
        drawBlackCardButton.classList.remove("hidden");
        currentBlackCard.textContent = "";
        game.submittedCards = [];
        updateTurn();
    }

    function nextTurn() {
        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
        if (game.currentPlayerIndex === 0) {
            game.round++;
        }
        updateTurn();
    }

    function updateTurn() {
        const currentPlayer = game.players[game.currentPlayerIndex].username;
        alert("È il turno di " + currentPlayer);
        if (currentPlayer === game.players[0].username) {
            drawBlackCardButton.classList.remove("hidden");
        } else {
            drawBlackCardButton.classList.add("hidden");
        }
    }

    function updatePlayerList() {
        usersList.innerHTML = "";
        game.players.forEach(player => {
            const listItem = document.createElement("li");
            listItem.textContent = player.username + " (Punti: " + player.points + ")";
            usersList.appendChild(listItem);
        });
    }

    function updateWhiteCards(username) {
        whiteCardsContainer.innerHTML = "";
        game.whiteCards[username].forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.className = "card white-card";
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "whiteCard";
            radioInput.value = card;
            cardElement.appendChild(radioInput);
            const cardText = document.createElement("span");
            cardText.textContent = card;
            cardElement.appendChild(cardText);
            whiteCardsContainer.appendChild(cardElement);
        });
    }

    function showSubmittedCards() {
        submitWhiteCardButton.classList.add("hidden");
        submittedCardsContainer.classList.remove("hidden");
        selectWinnerContainer.classList.remove("hidden");

        submittedCards.innerHTML = "";
        game.submittedCards.forEach(submission => {
            const listItem = document.createElement("li");
            listItem.textContent = submission.card;
            submittedCards.appendChild(listItem);

            const selectionItem = document.createElement("li");
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "submittedCard";
            radioInput.value = submission.card;
            selectionItem.appendChild(radioInput);
            const cardText = document.createElement("span");
            cardText.textContent = submission.card;
            selectionItem.appendChild(cardText);
            submittedCardsForSelection.appendChild(selectionItem);
        });
    }

    document.getElementById("selectWinnerButton").addEventListener("click", function () {
        const selectedCard = document.querySelector('input[name="submittedCard"]:checked');
        if (selectedCard) {
            const winningCard = selectedCard.value;
            const winningSubmission = game.submittedCards.find(submission => submission.card === winningCard);
            const winningPlayer = game.players.find(player => player.username === winningSubmission.player);
            winningPlayer.points++;
            updatePlayerList();
            alert("Il vincitore del turno è: " + winningPlayer.username);
            submittedCardsContainer.classList.add("hidden");
            selectWinnerContainer.classList.add("hidden");
            game.submittedCards = [];
            nextTurn();
        } else {
            alert("Seleziona una carta vincente.");
        }
    });
});