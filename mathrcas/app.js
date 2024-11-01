let currentGrade;
let currentLevel = 1;
let totalLevels = 10; // Puedes aumentar este número para más niveles
let progress = 0;

// Ejemplo de preguntas por nivel
const questions = {
    3: [
        {
            question: "¿Cuánto es 2 + 2?",
            type: "multiple", // Tipo de pregunta: múltiple
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "¿Cuánto es 5 - 3?",
            type: "multiple",
            options: ["2", "3", "1", "4"],
            answer: "2"
        },
        {
            question: "¿Cuál es el número siguiente después de 3?",
            type: "open", // Tipo de pregunta: abierta
            answer: "4"
        }
    ],
    4: [
        {
            question: "¿Cuánto es 6 x 7?",
            type: "multiple",
            options: ["42", "48", "36", "56"],
            answer: "42"
        },
        {
            question: "¿Cuánto es 15 ÷ 3?",
            type: "multiple",
            options: ["5", "6", "4", "3"],
            answer: "5"
        },
        {
            question: "Si tienes 5 manzanas y comes 2, ¿cuántas te quedan?",
            type: "open",
            answer: "3"
        }
    ],
    5: [
        {
            question: "¿Cuál es el área de un rectángulo de 5x10?",
            type: "multiple",
            options: ["15", "50", "25", "35"],
            answer: "50"
        },
        {
            question: "¿Cuánto es 20 - 4 x 3?",
            type: "multiple",
            options: ["8", "12", "16", "10"],
            answer: "8"
        },
        {
            question: "¿Cuál es la suma de todos los números del 1 al 5?",
            type: "open",
            answer: "15"
        }
    ],
    6: [
        {
            question: "¿Cuál es el resultado de 3² + 4²?",
            type: "multiple",
            options: ["12", "9", "25", "7"],
            answer: "25"
        },
        {
            question: "¿Cuánto es el 25% de 200?",
            type: "multiple",
            options: ["25", "50", "75", "100"],
            answer: "50"
        },
        {
            question: "¿Cuántos lados tiene un hexágono?",
            type: "open",
            answer: "6"
        }
    ]
};

function startGame(grade) {
    currentGrade = grade;
    currentLevel = 1;
    document.getElementById('grade-selection').style.display = 'none';
    document.getElementById('level-menu').style.display = 'block';
    document.getElementById('level').innerText = currentLevel;
}

function loadGame() {
    document.getElementById('level-menu').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('current-level').innerText = currentLevel;
    loadQuestion();
}

function loadQuestion() {
    const currentQuestions = questions[currentGrade];
    if (currentLevel <= currentQuestions.length) {
        const questionData = currentQuestions[currentLevel - 1]; // Obtenemos la pregunta correspondiente
        document.getElementById('question').innerText = questionData.question;

        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = ''; // Limpiar opciones anteriores

        if (questionData.type === "multiple") {
            // Pregunta de opción múltiple
            questionData.options.forEach(option => {
                const button = document.createElement('button');
                button.innerText = option;
                button.onclick = () => checkAnswer(option, questionData.answer);
                optionsDiv.appendChild(button);
            });
        } else if (questionData.type === "open") {
            // Pregunta abierta
            const input = document.createElement('input');
            input.type = "text";
            input.placeholder = "Escribe tu respuesta aquí...";
            optionsDiv.appendChild(input);

            const submitButton = document.createElement('button');
            submitButton.innerText = "Enviar Respuesta";
            submitButton.onclick = () => checkOpenAnswer(input.value, questionData.answer);
            optionsDiv.appendChild(submitButton);
        }
    } else {
        alert("¡Felicidades! Has completado todos los niveles.");
    }
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        document.getElementById('feedback').innerText = "¡Correcto!";
        nextLevel();
    } else {
        document.getElementById('feedback').innerText = "Incorrecto, intenta de nuevo.";
    }
}

function checkOpenAnswer(selected, correct) {
    if (selected.trim() === correct) {
        document.getElementById('feedback').innerText = "¡Correcto!";
        nextLevel();
    } else {
        document.getElementById('feedback').innerText = "Incorrecto, intenta de nuevo.";
    }
}

function nextLevel() {
    if (currentLevel < totalLevels) {
        currentLevel++;
        progress += (100 / totalLevels);
        document.getElementById('progress').style.width = progress + '%';
        document.getElementById('current-level').innerText = currentLevel;
        loadQuestion();
    } else {
        // Manejar el caso en que se completan todos los niveles
        alert("¡Felicidades! Has completado todos los niveles.");
    }
}

function goBack() {
    // Lógica para regresar al inicio
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('grade-selection').style.display = 'block';
    progress = 0;
    document.getElementById('progress').style.width = '0%';
}

function resetProgress() {
    if (confirm("¿Estás seguro de que quieres empezar desde cero?")) {
        currentLevel = 1;
        progress = 0;
        document.getElementById('progress').style.width = '0%';
        loadGame();
    }
}

function showInfo() {
    document.getElementById('info-box').style.display = 'block'; // Mostrar el cuadro de información
}

function closeInfo() {
    document.getElementById('info-box').style.display = 'none'; // Cerrar el cuadro de información
}
