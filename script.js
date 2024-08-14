const levels = [
    [
        { id: "q1", key: "A11", clock_img: "clock1.png", drag_img: "img1.jpg", time: "03:30" },
        { id: "q2", key: "A12", clock_img: "clock2.png", drag_img: "img2.jpg", time: "05:45" },
        { id: "q3", key: "A13", clock_img: "clock3.png", drag_img: "img3.jpg", time: "03:25" },
        { id: "q4", key: "A14", clock_img: "clock4.png", drag_img: "img4.jpg", time: "07:10" },
        { id: "q5", key: "A15", clock_img: "clock5.png", drag_img: "img5.jpg", time: "08:03" },
        { id: "q6", key: "A16", clock_img: "clock6.png", drag_img: "img6.jpg", time: "04:35" },
        { id: "q7", key: "A17", clock_img: "clock7.png", drag_img: "img7.jpg", time: "05:20" },
        { id: "q8", key: "A18", clock_img: "clock8.png", drag_img: "img8.jpg", time: "12:50" },
        { id: "q9", key: "A19", clock_img: "clock9.png", drag_img: "img9.jpg", time: "07:55" }
    ],
    [
        { id: "q1", key: "B11", clock_img: "clock10.png", drag_img: "img10.jpg", time: "03:40" },
        { id: "q2", key: "B12", clock_img: "clock11.png", drag_img: "img11.jpg", time: "10:45" },
        { id: "q3", key: "B13", clock_img: "clock12.png", drag_img: "img12.jpg", time: "07:50" },
        { id: "q4", key: "B14", clock_img: "clock13.png", drag_img: "img13.jpg", time: "03:30" },
        { id: "q5", key: "B15", clock_img: "clock14.png", drag_img: "img14.jpg", time: "05:45" },
        { id: "q6", key: "B16", clock_img: "clock15.png", drag_img: "img15.jpg", time: "03:25" },
        { id: "q7", key: "B17", clock_img: "clock16.png", drag_img: "img16.jpg", time: "07:10" },
        { id: "q8", key: "B18", clock_img: "clock17.png", drag_img: "img17.jpg", time: "08:03" },
        { id: "q9", key: "B19", clock_img: "clock18.png", drag_img: "img18.jpg", time: "04:35" }
    ],
    [
        { id: "q1", key: "C11", clock_img: "clock19.png", drag_img: "img19.jpg", time: "06:00" },
        { id: "q2", key: "C12", clock_img: "clock20.png", drag_img: "img20.jpg", time: "03:15" },
        { id: "q3", key: "C13", clock_img: "clock21.png", drag_img: "img21.jpg", time: "12:30" },
        { id: "q4", key: "C14", clock_img: "clock22.png", drag_img: "img22.jpg", time: "03:35" },
        { id: "q5", key: "C15", clock_img: "clock23.png", drag_img: "img23.jpg", time: "05:45" },
        { id: "q6", key: "C16", clock_img: "clock24.png", drag_img: "img24.jpg", time: "07:15" },
        { id: "q7", key: "C17", clock_img: "clock25.png", drag_img: "img25.jpg", time: "03:30" },
        { id: "q8", key: "C18", clock_img: "clock26.png", drag_img: "img26.jpg", time: "6:15" },
        { id: "q9", key: "C19", clock_img: "clock27.png", drag_img: "img27.jpg", time: "09:25" }
    ],
    [
        { id: "q1", key: "D11", clock_img: "clock28.png", drag_img: "img28.jpg", time: "07:20" },
        { id: "q2", key: "D12", clock_img: "clock29.png", drag_img: "img29.jpg", time: "01:45" },
        { id: "q3", key: "D13", clock_img: "clock30.png", drag_img: "img30.jpg", time: "09:30" },
        { id: "q4", key: "D14", clock_img: "clock31.png", drag_img: "img31.jpg", time: "04:10" },
        { id: "q5", key: "D15", clock_img: "clock32.png", drag_img: "img32.jpg", time: "12:05" },
        { id: "q6", key: "D16", clock_img: "clock33.png", drag_img: "img33.jpg", time: "05:50" },
        { id: "q7", key: "D17", clock_img: "clock34.png", drag_img: "img34.jpg", time: "02:30" },
        { id: "q8", key: "D18", clock_img: "clock35.png", drag_img: "img35.jpg", time: "10:15" },
        { id: "q9", key: "D19", clock_img: "clock36.png", drag_img: "img36.jpg", time: "08:40" }
    ]
];

let score = 0;
let timeRemaining = 60;
let timer;
let gameStarted = false;
let currentLevel = 0;
let currentDragIndex = 0;
let shuffledQuestions = [];
let elementsPlaced = 0; // Track placed elements

document.addEventListener('DOMContentLoaded', initializeGame);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame() {
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('timeremainingvalue').textContent = timeRemaining;
    document.getElementById('startResetButton').addEventListener('click', toggleGame);
    document.getElementById('startResetButtonInGame').addEventListener('click', toggleGame);
}

function setupGameElements(level) {
    const questions = levels[level];
    shuffledQuestions = [...questions];
    const clockGrid = document.getElementById('clockGrid');
    clockGrid.innerHTML = '';
    elementsPlaced = 0; // Reset the count for the new level

    questions.forEach((question) => {
        const cell = document.createElement('div');
        cell.classList.add('clock-cell');
        cell.setAttribute('id', question.key);
        cell.style.backgroundImage = `url(${question.clock_img})`;

        cell.addEventListener('dragover', (e) => e.preventDefault());
        cell.addEventListener('drop', handleDrop);
        clockGrid.appendChild(cell);
    });

    shuffle(shuffledQuestions);
    currentDragIndex = 0;
    displayNextDragImage();
}

function displayNextDragImage() {
    if (currentDragIndex < shuffledQuestions.length) {
        const question = shuffledQuestions[currentDragIndex];

        const dragContainer = document.createElement('div');
        dragContainer.classList.add('drag-container');

        const timeLabel = document.createElement('span');
        timeLabel.classList.add('time-label');
        timeLabel.textContent = question.time;

        const dragImage = document.createElement('img');
        dragImage.setAttribute('src', question.drag_img);
        dragImage.setAttribute('id', `drag-${question.key}`);
        dragImage.setAttribute('draggable', 'true');
        dragImage.addEventListener('dragstart', handleDragStart);

        dragContainer.appendChild(timeLabel);
        dragContainer.appendChild(dragImage);

        const dragImagesContainer = document.getElementById('dragImageContainer');
        dragImagesContainer.innerHTML = '';
        dragImagesContainer.appendChild(dragContainer);
    }
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function handleDrop(e) {
    if (timeRemaining <= 0) return;

    const draggedImageId = e.dataTransfer.getData('text/plain');
    const draggedImage = document.getElementById(draggedImageId);
    const dropTargetId = e.target.id;

    const questions = levels[currentLevel];
    const draggedQuestion = questions.find(q => `drag-${q.key}` === draggedImageId);

    if (draggedQuestion && draggedQuestion.key === dropTargetId) {
        e.target.style.backgroundImage = `url(${draggedQuestion.drag_img})`;
        draggedImage.style.visibility = 'hidden';
        updateScore(1);
        elementsPlaced++;
        currentDragIndex++;
        displayNextDragImage();

        if (currentDragIndex === shuffledQuestions.length) {
            playSound('success.mp3');
            document.getElementById('result').textContent = 'Level Complete!';
            document.getElementById('result').style.display = 'block';

            // Wait for a short delay before moving to the next level
            setTimeout(nextLevel, 2000);
        }
    } else {
        updateScore(-1);
    }
}

function updateScore(value) {
    score += value;
    document.getElementById('score').textContent = `Score: ${score}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timeremainingvalue').textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            if (elementsPlaced < shuffledQuestions.length) {
                // If not all elements are placed, end the game
                endGame();
            }
        }
    }, 1000);
}

function endGame() {
    document.getElementById('result').textContent = '';
    document.getElementById('gameOver').textContent = `Game Over! Your score: ${score}`;
    document.getElementById('gameOver').style.display = 'block';
    playSound('gameover.mp3');
    setTimeout(() => {
        document.getElementById('animationPage').style.display = 'block';
        document.getElementById('gamePage').style.display = 'none';
        clearInterval(timer);
        gameStarted = false;
    }, 3000);
}

function nextLevel() {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        document.getElementById('levelIndicator').textContent = `Level ${currentLevel + 1}`;
        gameStarted = true;
        currentDragIndex = 0;

        score = 0;
        timeRemaining = 60;
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById('timeremainingvalue').textContent = timeRemaining;
        document.getElementById('result').textContent = '';
        document.getElementById('gameOver').style.display = 'none';

        setupGameElements(currentLevel);
        clearInterval(timer);
        startTimer();
    } else {
        document.getElementById('result').textContent = 'Congratulations! You completed all levels!';
        document.getElementById('result').style.display = 'block';
        document.getElementById('gameContainer').style.display = 'none'; // Hide game container
        playSound('gameover.mp3');
    }
}

function prevLevel() {
    if (currentLevel > 0) {
        currentLevel--;
        document.getElementById('levelIndicator').textContent = `Level ${currentLevel + 1}`;
        gameStarted = true;
        currentDragIndex = 0;

        score = 0;
        timeRemaining = 60;
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById('timeremainingvalue').textContent = timeRemaining;
        document.getElementById('result').textContent = '';
        document.getElementById('gameOver').style.display = 'none';

        setupGameElements(currentLevel);
        clearInterval(timer);
        startTimer();
    } else {
        document.getElementById('result').textContent = 'You are at the first level!';
    }
}

function toggleGame() {
    if (!gameStarted) {
        // Start the game
        document.getElementById('animationPage').style.display = 'none';
        document.getElementById('gamePage').style.display = 'block';
        setupGameElements(currentLevel);
        startTimer();
        gameStarted = true;
    } else {
        // Reset the game
        document.getElementById('animationPage').style.display = 'block';
        document.getElementById('gamePage').style.display = 'none';
        score = 0;
        timeRemaining = 60;
        currentLevel = 0;
        currentDragIndex = 0;
        elementsPlaced = 0;
        gameStarted = false;
        clearInterval(timer);
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById('timeremainingvalue').textContent = timeRemaining;
    }
}

function playSound(file) {
    const audio = new Audio(file);
    audio.play();
}

function start_canvas() {
    window.requestAnimationFrame(draw_canvas);
}

function draw_canvas() {
    var canvas = document.getElementById("clock-canvas");
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    fix_resolution(canvas, context);
    draw_clocks(canvas, context);

    window.requestAnimationFrame(draw_canvas);
}

function fix_resolution(canvas, context) {
    var dpi = window.devicePixelRatio;
    var style_height = Math.floor(getComputedStyle(canvas).getPropertyValue("height").slice(0, -2));
    var style_width = Math.floor(getComputedStyle(canvas).getPropertyValue("width").slice(0, -2));

    canvas.setAttribute("height", style_height * dpi);
    canvas.setAttribute("width", style_width * dpi);
}

function draw_clocks(canvas, context) {
    var time = new Date();
    var angles = angle_array(time, 3);

    if (canvas.width < canvas.height) {
        l_angles = [[], [], [], [], [], [], [], [], [], [], [], []];
        var idx = Math.floor(angles[0].length / 2);
        for (var i = 0; i < angles.length; i++) {
            l_angles[i] = l_angles[i].concat(angles[i].slice(0, idx));
            l_angles[i + angles.length] = l_angles[i + angles.length].concat(angles[i].slice(idx, angles[i].length));
        }
        angles = l_angles;
    }

    if (angles.length / angles[0].length > canvas.height / canvas.width) {
        var d = canvas.height / angles.length;
        var x_space = (canvas.width - d * angles[0].length) / 2 + d / 2;
        var y_space = d / 2;
    } else {
        var d = canvas.width / angles[0].length;
        var x_space = d / 2;
        var y_space = (canvas.height - d * angles.length) / 2 + d / 2;
    }

    for (var i = 0; i < angles.length; i++) {
        for (var j = 0; j < angles[0].length; j++) {
            var angle1 = angles[i][j][0];
            var angle2 = angles[i][j][1];
            var x = x_space + j * d;
            var y = y_space + i * d;
            draw_clock(context, x, y, d / 2, angle1, angle2);
        }
    }
}

function draw_clock(context, cx, cy, radius, angle1, angle2) {
    angle1 *= Math.PI / 180;
    angle2 *= Math.PI / 180;

    context.strokeStyle = "#3f3f3f";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(cx, cy, radius, 0, 2 * Math.PI);
    context.stroke()
    context.strokeStyle = "#f0f0f0";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(cx, cy);
    context.lineTo(cx + radius * Math.cos(angle1), cy + radius * Math.sin(angle1));
    context.moveTo(cx, cy);
    context.lineTo(cx + radius * Math.cos(angle2), cy + radius * Math.sin(angle2));
    context.stroke();
}

function angle_array(time1, dt) {
    var time2 = new Date(time1.getTime() + 1000 * dt);
    var h1 = time1.getHours();
    var h2 = time2.getHours();
    var m1 = time1.getMinutes();
    var m2 = time2.getMinutes();
    var s1 = time1.getSeconds() + time1.getMilliseconds() / 1000;
    var s2 = time2.getSeconds() + time2.getMilliseconds() / 1000;

    var t1 = [Math.floor(h1 / 10), h1 % 10, Math.floor(m1 / 10), m1 % 10];
    var t2 = [Math.floor(h2 / 10), h2 % 10, Math.floor(m2 / 10), m2 % 10];

    var trans1 = t1[0] != t2[0] ? 1 - (60 * (((t1[0] < 2) ? 10 : 4) - h1) * (60 - m1) - s1) / dt : 0;
    var trans2 = t1[1] != t2[1] ? 1 - (60 * (60 - m1) - s1) / dt : 0;
    var trans3 = t1[2] != t2[2] ? 1 - (60 * (10 - m1 % 10) - s1) / dt : 0;
    var trans4 = t1[3] != t2[3] ? 1 - (60 - s1) / dt : 0;
    var v_lerp = [trans1, trans2, trans3, trans4];

    var angles = [[], [], [], [], [], []];
    for (var i = 0; i < angles.length; i++) {
        for (var j = 0; j < t1.length; j++) {
            var l_angles = transition(v_lerp[j], digit(t1[j]), digit(t2[j]));
            angles[i] = angles[i].concat(l_angles[i]);
        }
    }

    return angles;
}

function transition(v_lerp, digit1, digit2) {
    if (v_lerp == 0) {
        return digit1;
    } else if (v_lerp == 1) {
        return digit2;
    }

    var out = JSON.parse(JSON.stringify(digit1));
    for (var i = 0; i < digit1.length; i++) {
        for (var j = 0; j < digit1[0].length; j++) {
            for (var k = 0; k < digit1[0][0].length; k++) {
                var a = digit1[i][j][k];
                var b = digit2[i][j][k];
                if (b < a) {
                    b += 360;
                }
                out[i][j][k] = a + v_lerp * (b - a);
            }
        }
    }
    return out;
}

function digit(num) {
    switch (num) {
        case 0:
            return [[state(0), state(1), state(1), state(2)],
                    [state(3), state(0), state(2), state(3)],
                    [state(3), state(3), state(3), state(3)],
                    [state(3), state(3), state(3), state(3)],
                    [state(3), state(5), state(4), state(3)],
                    [state(5), state(1), state(1), state(4)]];
        case 1:
            return [[state(0), state(1), state(2), state(-1)],
                    [state(5), state(2), state(3), state(-1)],
                    [state(-1), state(3), state(3), state(-1)],
                    [state(-1), state(3), state(3), state(-1)],
                    [state(0), state(4), state(5), state(2)],
                    [state(5), state(1), state(1), state(4)]];
        case 2:
            return [[state(0), state(1), state(1), state(2)],
                    [state(5), state(1), state(2), state(3)],
                    [state(0), state(1), state(4), state(3)],
                    [state(3), state(0), state(1), state(4)],
                    [state(3), state(5), state(1), state(2)],
                    [state(5), state(1), state(1), state(4)]];
        case 3:
            return [[state(0), state(1), state(1), state(2)],
                    [state(5), state(1), state(2), state(3)],
                    [state(0), state(1), state(4), state(3)],
                    [state(5), state(1), state(2), state(3)],
                    [state(0), state(1), state(4), state(3)],
                    [state(5), state(1), state(1), state(4)]];
        case 4:
            return [[state(0), state(2), state(0), state(2)],
                    [state(3), state(3), state(3), state(3)],
                    [state(3), state(5), state(4), state(3)],
                    [state(5), state(1), state(2), state(3)],
                    [state(-1), state(-1), state(3), state(3)],
                    [state(-1), state(-1), state(5), state(4)]];
        case 5:
            return [[state(0), state(1), state(1), state(2)],
                    [state(3), state(0), state(1), state(4)],
                    [state(3), state(5), state(1), state(2)],
                    [state(5), state(1), state(2), state(3)],
                    [state(0), state(1), state(4), state(3)],
                    [state(5), state(1), state(1), state(4)]];
        case 6:
            return [[state(0), state(1), state(1), state(2)],
                    [state(3), state(0), state(1), state(4)],
                    [state(3), state(5), state(1), state(2)],
                    [state(3), state(0), state(2), state(3)],
                    [state(3), state(5), state(4), state(3)],
                    [state(5), state(1), state(1), state(4)]];
        case 7:
            return [[state(0), state(1), state(1), state(2)],
                    [state(5), state(1), state(2), state(3)],
                    [state(-1), state(-1), state(3), state(3)],
                    [state(-1), state(-1), state(3), state(3)],
                    [state(-1), state(-1), state(3), state(3)],
                    [state(-1), state(-1), state(5), state(4)]];
        case 8:
            return [[state(0), state(1), state(1), state(2)],
                    [state(3), state(0), state(2), state(3)],
                    [state(3), state(5), state(4), state(3)],
                    [state(3), state(0), state(2), state(3)],
                    [state(3), state(5), state(4), state(3)],
                    [state(5), state(1), state(1), state(4)]];
        case 9:
            return [[state(0), state(1), state(1), state(2)],
                    [state(3), state(0), state(2), state(3)],
                    [state(3), state(5), state(4), state(3)],
                    [state(5), state(1), state(2), state(3)],
                    [state(0), state(1), state(4), state(3)],
                    [state(5), state(1), state(1), state(4)]];
        default:
            return []
    }
}

function state(num) {
    switch (num) {
        case 0:
            return [0, 90];
        case 1:
            return [0, 180];
        case 2:
            return [90, 180];
        case 3:
            return [90, 270];
        case 4:
            return [180, 270];
        case 5:
            return [0, 270];
        default:
            return [135, 135];
    }
}