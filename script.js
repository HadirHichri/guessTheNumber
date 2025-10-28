// --- Variables Globales ---
let randomNumber = Math.floor(Math.random() * 100) + 1; // Nombre secret entre 1 et 100
let attempts = 10; // Nombre de tentatives autorisées
let gameOver = false; // Indique si le jeu est terminé

// --- Références aux Éléments HTML ---
const guessInput = document.getElementById('guessInput');
const submitGuessButton = document.getElementById('submitGuess');
const messageDisplay = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const resetButton = document.getElementById('resetButton');

// --- Fonctions du Jeu ---

/**
 * Initialise un nouveau jeu.
 */
function initGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    gameOver = false;
    messageDisplay.textContent = ''; // Vide le message précédent
    attemptsDisplay.textContent = attempts;
    guessInput.value = ''; // Vide le champ d'entrée
    guessInput.disabled = false; // Réactive l'input
    submitGuessButton.disabled = false; // Réactive le bouton
    resetButton.classList.add('hidden'); // Cache le bouton rejouer
    guessInput.focus(); // Met le focus sur l'input pour commencer
}

/**
 * Traite la proposition du joueur.
 */
function checkGuess() {
    if (gameOver) return; // Si le jeu est terminé, ne rien faire

    const userGuess = parseInt(guessInput.value);

    // Validation de l'entrée
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageDisplay.textContent = 'Veuillez entrer un nombre valide entre 1 et 100.';
        messageDisplay.style.color = '#ffdd57'; // Jaune pour avertissement
        return;
    }

    attempts--;
    attemptsDisplay.textContent = attempts;

    // Logique du jeu
    if (userGuess === randomNumber) {
        messageDisplay.textContent = `Bravo ! Vous avez trouvé le nombre (${randomNumber}) en ${10 - attempts} tentatives !`;
        messageDisplay.style.color = '#00fc3fff'; // Vert pour la victoire
        endGame(true);
    } else if (userGuess < randomNumber) {
        messageDisplay.textContent = 'C\'est plus grand !';
        messageDisplay.style.color = '#61dafb'; // Bleu clair
    } else { // userGuess > randomNumber
        messageDisplay.textContent = 'C\'est plus petit !';
        messageDisplay.style.color = '#61dafb'; // Bleu clair
    }

    guessInput.value = ''; // Efface l'entrée après chaque tentative

    // Vérifier si les tentatives sont épuisées
    if (attempts === 0 && userGuess !== randomNumber) {
        messageDisplay.textContent = `Dommage ! Vous n'avez plus de tentatives. Le nombre était ${randomNumber}.`;
        messageDisplay.style.color = '#ff6347'; // Rouge pour la défaite
        endGame(false);
    }
}

/**
 * Termine le jeu, désactive les contrôles et affiche le bouton Rejouer.
 * @param {boolean} win - True si le joueur a gagné, False sinon.
 */
function endGame(win) {
    gameOver = true;
    guessInput.disabled = true;
    submitGuessButton.disabled = true;
    resetButton.classList.remove('hidden'); // Affiche le bouton rejouer
}

// --- Écouteurs d'Événements ---

// Bouton Proposer
submitGuessButton.addEventListener('click', checkGuess);

// Touche Entrée dans le champ de saisie
guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Bouton Rejouer
resetButton.addEventListener('click', initGame);

// --- Initialisation au Chargement de la Page ---
document.addEventListener('DOMContentLoaded', initGame);