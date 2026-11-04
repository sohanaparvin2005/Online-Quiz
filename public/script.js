
// Online Quiz Application

const questions = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        answer: "New Delhi"
    },
    {
        question: "Which language is used for web development?",
        options: ["HTML", "CSS", "JavaScript", "All of these"],
        answer: "All of these"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        answer: "Netscape"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "##", "<!--", "**"],
        answer: "//"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["var", "let", "const", "All of these"],
        answer: "All of these"
    },
    {
        question: "Which method prints output in the browser console?",
        options: [
            "console.log()",
            "print()",
            "display()",
            "write()"
        ],
        answer: "console.log()"
    },
    {
        question: "Which CSS property changes text color?",
        options: ["background", "font-size", "color", "border"],
        answer: "color"
    },
    {
        question: "Which keyword is used to create a function?",
        options: ["function", "method", "create", "define"],
        answer: "function"
    },
    {
        question: "Which HTML tag is used for a hyperlink?",
        options: ["<p>", "<a>", "<h1>", "<div>"],
        answer: "<a>"
    }
];

// Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let studentName = "";
let answered = false;

// HTML Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const nameInput = document.getElementById("student-name");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const questionNumber = document.getElementById("question-number");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const feedback = document.getElementById("feedback");

// Start Quiz
startBtn.addEventListener("click", () => {

    studentName = nameInput.value.trim();

    if (studentName === "") {
        document.getElementById("name-error").textContent =
            "Please enter your name!";
        return;
    }

    document.getElementById("name-error").textContent = "";

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    currentQuestion = 0;
    score = 0;

    showQuestion();
});

// Display Question
function showQuestion() {

    clearInterval(timer);

    answered = false;
    timeLeft = 15;

    nextBtn.disabled = true;
    nextBtn.textContent = "Next Question";
    feedback.textContent = "";

    const q = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1}/${questions.length}`;

    questionText.textContent = q.question;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsContainer.innerHTML = "";

    q.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option";

        button.addEventListener("click", () => {
            selectAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });

    startTimer();
}

// Timer
function startTimer() {

    timerDisplay.textContent = `Time: ${timeLeft}s`;

    timer = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);

            if (!answered) {
                feedback.textContent =
                    "Time is up! Correct answer: " +
                    questions[currentQuestion].answer;

                feedback.style.color = "red";

                answered = true;
                disableOptions();
                nextBtn.disabled = false;
            }
        }

    }, 1000);
}

// Select Answer
function selectAnswer(button, selectedOption) {

    if (answered) return;

    answered = true;
    clearInterval(timer);

    const correctAnswer = questions[currentQuestion].answer;

    if (selectedOption === correctAnswer) {

        score++;

        button.classList.add("correct");

        feedback.textContent = "Correct Answer! 🎉";
        feedback.style.color = "green";

    } else {

        button.classList.add("wrong");

        feedback.textContent =
            "Wrong Answer! Correct answer: " + correctAnswer;

        feedback.style.color = "red";
    }

    disableOptions();

    nextBtn.disabled = false;
}

// Disable All Options
function disableOptions() {

    const allOptions =
        optionsContainer.querySelectorAll(".option");

    allOptions.forEach(option => {

        option.disabled = true;

        if (option.textContent === questions[currentQuestion].answer) {
            option.classList.add("correct");
        }
    });
}

// Next Question
nextBtn.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
});

// Show Final Result
function showResult() {

    clearInterval(timer);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const percentage =
        Math.round((score / questions.length) * 100);

    document.getElementById("result-name").textContent =
        "Student Name: " + studentName;

    document.getElementById("total").textContent =
        questions.length;

    document.getElementById("correct").textContent =
        score;

    document.getElementById("wrong").textContent =
        questions.length - score;

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("result-status").textContent =
        percentage >= 50 ? "PASS 🎉" : "FAIL ❌";
}

// Restart Quiz
restartBtn.addEventListener("click", () => {

    clearInterval(timer);

    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    nameInput.value = "";
});
