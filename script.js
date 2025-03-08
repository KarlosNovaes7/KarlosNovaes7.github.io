// script.js

// Global variable to track if music is playing
var isMusicPlaying = false;
var backgroundMusic;

// Function to initialize when page loads
function initialize() {
    displayCat(); // Exibir a imagem inicial do gato

    backgroundMusic = document.getElementById('background-music');
    backgroundMusic.muted = false; // Desmutar o áudio
    
    // Tentar tocar o áudio imediatamente
    backgroundMusic.play().then(() => {
        isMusicPlaying = true;
        document.getElementById('sound-button').textContent = '🔊';
    }).catch(error => {
        console.log('Reprodução automática bloqueada. Esperando interação do usuário.');
        // Mantemos a escuta para interação do usuário
        document.body.addEventListener('click', function() {
            if (!isMusicPlaying) {
                playBackgroundMusic();
            }
        }, { once: true });
    });
}


// Function to play background music
function playBackgroundMusic() {
    backgroundMusic.play()
        .then(() => {
            isMusicPlaying = true;
            document.getElementById('sound-button').textContent = '🔊';
        })
        .catch(error => {
            console.log('Music play failed:', error);
            // Most browsers require user interaction to play audio
        });
}

// Function to toggle sound on/off
function toggleSound() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        isMusicPlaying = false;
        document.getElementById('sound-button').textContent = '🔇';
    } else {
        playBackgroundMusic();
    }
}

// Function to handle button click events
function selectOption(option) {
    // Check which option was clicked
    if (option === 'yes') {
        // Flash rainbow colors
        flashRainbowColors(function() {
            document.getElementById('question').style.display = 'none'; // Hide the question
            displayCatHeart(); // Display the cat-heart.gif
        });
    } else if (option === 'no') {
        // Change text on the "No" button to "You sure?"
        document.getElementById('no-button').innerText = 'Tem certeza?'; 
        // Increase font size of "Yes" button
        var yesButton = document.getElementById('yes-button');
        var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        var newSize = parseFloat(currentFontSize) * 2; // Increase font size by  * 2px
        yesButton.style.fontSize = newSize + 'px';
    } else {
        // If neither "Yes" nor "No" was clicked, show an alert message
        alert('Invalid option!');
    }
}

// Function to flash rainbow colors and then execute a callback function
function flashRainbowColors(callback) {
    var colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    var i = 0;
    var interval = setInterval(function() {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200); // Change color every 200 milliseconds
    setTimeout(function() {
        clearInterval(interval);
        document.body.style.backgroundColor = ''; // Reset background color
        if (callback) {
            callback();
        }
    }, 2000); // Flash colors for 2 seconds
}

// Function to display the cat.gif initially
function displayCat() {
    // Get the container where the image will be displayed
    var imageContainer = document.getElementById('image-container');
    // Create a new Image element for the cat
    var catImage = new Image();
    // Set the source (file path) for the cat image
    catImage.src = 'cat.gif'; // Assuming the cat image is named "cat.gif"
    // Set alternative text for the image (for accessibility)
    catImage.alt = 'Cat';
    // When the cat image is fully loaded, add it to the image container
    catImage.onload = function() {
        imageContainer.appendChild(catImage);
    };
}

// Function to display the cat-heart.gif
function displayCatHeart() {
    // Clear existing content in the image container
    document.getElementById('image-container').innerHTML = '';
    // Get the container where the image will be displayed
    var imageContainer = document.getElementById('image-container');
    // Create a new Image element for the cat-heart
    var catHeartImage = new Image();
    // Set the source (file path) for the cat-heart image
    catHeartImage.src = 'cat-heart.gif'; // Assuming the cat-heart image is named "cat-heart.gif"
    // Set alternative text for the image (for accessibility)
    catHeartImage.alt = 'Cat Heart';
    // When the cat-heart image is fully loaded, add it to the image container
    catHeartImage.onload = function() {
        imageContainer.appendChild(catHeartImage);
        // Hide the options container
        document.getElementById('options').style.display = 'none';
        
        // Adicione uma mensagem após clicar em "Yes"
        var thankYouMessage = document.createElement('div');
        thankYouMessage.textContent = "Yay! Eu também te amo Mochi Mochi ❤️";
        thankYouMessage.style.fontFamily = "'Sacramento', cursive";
        thankYouMessage.style.fontSize = "32px";
        thankYouMessage.style.marginTop = "20px";
        thankYouMessage.style.color = "#e91e63";
        document.getElementById('text-container').appendChild(thankYouMessage);
    };
}

// Initialize when the page loads
window.onload = initialize;