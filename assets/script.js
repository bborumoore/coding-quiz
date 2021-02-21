// Code snippet allows alert to be dismissed.
$('.alert').alert()

// variables to hold the different html tags I need to work with
let $startQuiz = $("#start-quiz");
let $quizHolder = $("#quiz-holder");
let $answerHolder = $("#answer-holder");
let $questionHolder = $("#question-holder");
let quizTimerEl = $('#quiz-timer');
let scoreHolderEl = $('#score-holder');
let score = 0;
let timeLeft = 60.0;
let $answerButtons = $('.answer-btn');
// Declaring overall indexer to track question number
let currentQuestion = 0;



// Set up the Question Object, and populate an array with 4 Questions for the Quiz MVP with correct answers indicated
let questionArr = [
    {
        question: "The first answer is a!",
        answers: ["a", "b", "c", "d"],
        correct: "a",
    },
    {
        question: "The second answer is elephant!",
        answers: ["apple", "baaananan", "cangaroo", "elephant"],
        correct: "elephant",
    },
    {
        question: "The third answer is two!",
        answers: ["one", "two", "three", "four"],
        correct: "two",
    },
    {
        question: "The final answer is yes!",
        answers: ["a", "b", "c", "yes"],
        correct: "yes",
    }
]

function answerClick(event) {
    // this.preventDefault();
    // console.log("answerclick open");
    console.log("answerclick " + event.target.value);
    // console.log(questionArr[currentQuestion].correct);
    if (this.value == questionArr[currentQuestion].correct) {
        score++;
    } else {
        timeLeft -= 5;
    }
    currentQuestion++;
    $answerHolder.children().remove();
    generateQuestion(currentQuestion-1);
};

// Next, we'll build the function that transitions the page to the Code Quiz Layout
function startQuiz() {
    // Remove the Start Quiz! button
    $startQuiz.remove();
    $quizHolder.remove();
    generateQuestion();
    doTimer();
}

function generateQuestion() {    

    // Load the Question into the appropriate place
    $questionHolder.text(questionArr[currentQuestion].question);
    console.log(questionArr[currentQuestion].question);  
    
    // Create 4 buttons to store the answers
    for (j = 0; j < questionArr[currentQuestion].answers.length; j++) {
        let btnText = "<btn class='btn btn-info col-sm-10 col-md-2 answer-btn'>" + questionArr[currentQuestion].answers[j] 
        + "</btn>";
        $answerHolder.append(btnText);
        // console.log(questionArr[currentQuestion].answers[j]);
    }
    
};

// Create a function to start and update timer
function doTimer() {
    quizTimerEl.text(timeLeft);
    timeLeft--;
    timeTimer();
    if(timeLeft <=0 || currentQuestion >= 5) {
        stopTimer();
    }
}; 

// This next bit of code allows me to stop the timer function when appropriate conditions are met
let myTimer = setInterval(timeTimer, 1000);

function timeTimer() {
    quizTimerEl.text(timeLeft); 
    timeLeft--;
    scoreHolderEl.text(score);
   };

function stopTimer() {
    clearInterval(myTimer);
};

// Add an event listener for the Start Quiz! button
$startQuiz.on('click', startQuiz);
$answerHolder.on('click', '.answer-btn', answerClick);
