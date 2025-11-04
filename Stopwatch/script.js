let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'flex';
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        startBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
    startBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutesDisplay.textContent = padNumber(minutes);
    secondsDisplay.textContent = padNumber(seconds);
    millisecondsDisplay.textContent = padNumber(milliseconds);
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

function addLap() {
    if (isRunning) {
        lapCount++;
        const lapTime = {
            minutes: minutesDisplay.textContent,
            seconds: secondsDisplay.textContent,
            milliseconds: millisecondsDisplay.textContent
        };

        const lapItem = document.createElement('div');
        lapItem.classList.add('lap-item');
        lapItem.innerHTML = `
            <span>Lap ${lapCount}</span>
            <span>${lapTime.minutes}:${lapTime.seconds}:${lapTime.milliseconds}</span>
        `;

        lapsContainer.insertBefore(lapItem, lapsContainer.firstChild);
    }
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

// Initial setup
pauseBtn.style.display = 'none';