let currentImage = 1;
let imageTimer;
let clickTimer;
let count = 0;
let maxReps = 0; // Initialize maxReps to store cumulative count of reps
let startTime;
let isGameStarted = false;
let bestTime = null;

// Setup event listeners for game interactions
document.getElementById('gameContainer').addEventListener('click', handleGameClick);
document.getElementById('restart').addEventListener('click', function() {
    maxReps = 0; // Reset maxReps only on restart
    resetGame();
    setupElements();
});

// Alternate images during the "Click to Start" phase
function alternateStandImages() {
    imageTimer = setInterval(() => {
        const standImage1 = document.getElementById('standImage1');
        const standImage2 = document.getElementById('standImage2');
        standImage1.style.display = currentImage === 1 ? 'block' : 'none';
        standImage2.style.display = currentImage === 1 ? 'none' : 'block';
        currentImage = 1 - currentImage;
    }, 1000);
}

// Start game function when "Click to Start" is clicked
function startGame() {
    clearInterval(imageTimer);
    document.getElementById('standImage1').style.display = 'none';
    document.getElementById('standImage2').style.display = 'none';
    document.getElementById('clickToStart').style.display = 'none';
    document.getElementById('pushUpImage').src = 'pushup1.png'; // Start with pushup1 image
    document.getElementById('pushUpImage').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    startTime = new Date();
    isGameStarted = true;
    count = 0;
    document.getElementById('counter').innerText = count;
    resetClickTimer();
}

// Function to handle game clicks during active play
function performPushUp() {
    resetClickTimer();
    const pushUpImage = document.getElementById('pushUpImage');
    pushUpImage.src = currentImage === 1 ? 'pushup2.png' : 'pushup1.png';
    currentImage = 1 - currentImage;

    if (currentImage === 1) {
        count++;
        document.getElementById('counter').innerText = count;
        maxReps += 1;
        document.getElementById('maxReps').innerText = `MAX REPS: ${maxReps}`;
        updateMotivationalMessage(); // Call to update the motivational message

        if (count === 50) {
            let endTime = new Date();
            let timeTaken = (endTime - startTime) / 1000;
            document.getElementById('timer').innerText = `Time: ${timeTaken.toFixed(1)}s`;
            document.getElementById('timer').style.display = 'block';
            if (!bestTime || timeTaken < bestTime) {
                bestTime = timeTaken;
                document.getElementById('topRecord').innerText = `BEST TIME: ${bestTime.toFixed(1)}s`;
            }
        }
    }
}

function updateMotivationalMessage() {
    const message = document.getElementById('motivationalMessage');
    if (count === 10) {
        message.innerText = 'KEEP GOING!';
        message.style.display = 'block';
    } else if (count === 20) {
        message.innerText = 'HALFWAY THERE!';
        message.style.display = 'block';
    } else if (count === 30) {
        message.innerText = 'ALMOST DONE!';
        message.style.display = 'block';
    } else if (count === 40) {
        message.innerText = 'PUSH THROUGH!';
        message.style.display = 'block';
    } else if (count === 50) {
        message.innerText = 'YOU DID IT!';
        message.style.display = 'block';
    } else if (count === 60) {
        message.innerText = 'KEEP GOING!';
        message.style.display = 'block';
    } else if (count === 65) {
        message.innerText = 'KEEP GOING!!';
        message.style.display = 'block';
    } else if (count === 70) {
        message.innerText = 'KEEP GOING!!!';
        message.style.display = 'block';
    } else if (count === 100) {
        message.innerText = 'THANKS FOR PLAYING';
        message.style.display = 'block';
    } else {
        message.style.display = 'none'; // Hide the message unless a specific count is reached
    }
}

// Reset timer for inactivity
function resetClickTimer() {
    clearTimeout(clickTimer);
    clickTimer = setTimeout(showFailureState, 5000);
}

// Show failure state and reset option
function showFailureState() {
    document.getElementById('pushUpImage').style.display = 'none';
    document.getElementById('pushFailImage').style.display = 'block';
    document.getElementById('score').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('motivationalMessage').style.display = 'none';  // Hide motivational message
    document.getElementById('clickToStart').innerText = 'CLICK TO PLAY AGAIN';
    document.getElementById('clickToStart').style.display = 'block';
    isGameStarted = false;
}

// General reset function for the game
function resetGame() {
    clearInterval(imageTimer);
    clearTimeout(clickTimer);
    setupElements();
    alternateStandImages();
}

// Setup initial elements on game load or reset
function setupElements() {
    document.getElementById('standImage1').style.display = 'block';
    document.getElementById('standImage2').style.display = 'none';
    document.getElementById('pushUpImage').style.display = 'none';
    document.getElementById('pushFailImage').style.display = 'none';
    document.getElementById('clickToStart').style.display = 'block';
    document.getElementById('score').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('motivationalMessage').style.display = 'none';
    document.getElementById('maxReps').style.display = 'block'; // Ensure MAX REPS is visible
    count = 0;
    currentImage = 1;
    isGameStarted = false;
}

// Handle clicks on the game container
function handleGameClick() {
    if (document.getElementById('clickToStart').innerText === 'CLICK TO PLAY AGAIN' &&
        document.getElementById('pushFailImage').style.display === 'block') {
        resetGame();
    } else if (!isGameStarted && document.getElementById('clickToStart').style.display !== 'none') {
        startGame();
    } else if (isGameStarted) {
        performPushUp();
    }
}

// Initial call to set up all elements correctly when the page loads
setupElements();
alternateStandImages();
