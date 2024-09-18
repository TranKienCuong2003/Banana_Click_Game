// Các biến toàn cục
let count = 0;
let timeLeft = 30;  // Cập nhật thời gian còn lại là 30 giây
let timer;
let gameStarted = false;

// Khởi tạo các phần tử DOM
const banana = document.getElementById('banana');
const counter = document.getElementById('counter');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-btn');
const namePrompt = document.getElementById('name-prompt');
const playerNameInput = document.getElementById('player-name');
const submitNameButton = document.getElementById('submit-name');
const scoreList = document.getElementById('score-list');

// Sự kiện click chuối
banana.addEventListener('click', function () {
    if (!gameStarted) return;
    count++;
    counter.textContent = count;
    banana.classList.add('banana-clicked');
    setTimeout(() => banana.classList.remove('banana-clicked'), 100);
});

// Sự kiện bắt đầu trò chơi
startButton.addEventListener('click', function () {
    if (gameStarted) return;
    gameStarted = true;
    count = 0;
    counter.textContent = count;
    timeLeft = 30;  // Đặt lại thời gian về 30 giây
    timerDisplay.textContent = `Thời gian còn lại: ${timeLeft}`;
    timer = setInterval(updateTimer, 1000);
});

// Cập nhật bộ đếm thời gian
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Thời gian còn lại: ${timeLeft}`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        gameOver();
    }
}

// Khi hết giờ
function gameOver() {
    gameStarted = false;
    namePrompt.style.display = 'block';
}

// Sự kiện nhập tên người chơi
submitNameButton.addEventListener('click', function () {
    const playerName = playerNameInput.value.trim();
    if (playerName !== '') {
        saveScore(playerName, count);
        playerNameInput.value = '';
        namePrompt.style.display = 'none';
        displayScores();
    }
});

// Lưu điểm của người chơi
function saveScore(name, score) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ name, score });
    scores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Hiển thị bảng xếp hạng
function displayScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scoreList.innerHTML = '';
    scores.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${entry.name}: ${entry.score} điểm`;
        scoreList.appendChild(li);
    });
}

// Hiển thị bảng xếp hạng ngay khi tải trang
document.addEventListener('DOMContentLoaded', displayScores);
