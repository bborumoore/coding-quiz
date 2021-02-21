// Code snippet allows alert to be dismissed.
$('.alert').alert()

// variables to hold the different html tags I need to work with
let $startQuiz = $("#start-quiz");
let $quizHolder = $("#quiz-holder");
let $answerHolder = $("#answer-holder");
let $answer1 = $("#ans1");
let $answer2 = $("#ans2");
let $answer3 = $("#ans3");
let $answer4 = $("#ans4");
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
        question: "The first answer is d!",
        answers: ["a", "b", "c", "d"],
        correct: "d",
    },
    {
        question: "The second answer is elephant!",
        answers: ["apple", "baaananan", "cangaroo", "elephant"],
        correct: "elephant",
    },
    {
        question: "The third answer is four!",
        answers: ["one", "two", "three", "four"],
        correct: "four",
    },
    {
        question: "The final answer is yes!",
        answers: ["a", "b", "c", "yes"],
        correct: "yes",
    }
]

function answerClick() {
    // this.preventDefault();
    // console.log("answerclick open");
    // console.log("answerclick " + e.target);
    // console.log(questionArr[currentQuestion].correct);
    // if(timeLeft <=0 || currentQuestion >= 3) {
    //     stopTimer();
    //     setLocalScores();
    // } else if (this.value == questionArr[currentQuestion].correct) {
    //     score++;
    // } else {
        timeLeft -= 5;
    // }
    currentQuestion++;
    // $answerHolder.children().remove();
    generateQuestion(currentQuestion-1);
    
};

function answerClickCorrect() {
    score++;
    currentQuestion++;
    generateQuestion(currentQuestion-1);

}

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
    if (currentQuestion < 4) {
        $questionHolder.text(questionArr[currentQuestion].question);
    } else {
        setLocalScores();
        return;
    }
    // console.log(questionArr[currentQuestion].question);  
    
    // Create 4 buttons to store the answers  
    // for (j = 0; j < questionArr[currentQuestion].answers.length; j++) {
    //     // let btnText = "<btn class='btn btn-info col-sm-10 col-md-2 answer-btn'>" + questionArr[currentQuestion].answers[j] 
    //     // + "</btn>";
    //     // $answerHolder.append(btnText);
    //     // console.log(questionArr[currentQuestion].answers[j]);
    //     $answerHolder.children()..text(questionArr[currentQuestion].answers[j])
    //     }

    // Assign values to answer buttons
    $answer1.text(questionArr[currentQuestion].answers[0]);
    $answer2.text(questionArr[currentQuestion].answers[1]);
    $answer3.text(questionArr[currentQuestion].answers[2]);
    $answer4.text(questionArr[currentQuestion].answers[3]);
    
};

// Create a function to start and update timer
function doTimer() {
    quizTimerEl.text(timeLeft);
    timeLeft--;
    timeTimer();
    
}; 

// This next bit of code allows me to stop the timer function when appropriate conditions are met
// This was SUPPOSED to let me stop the timer, but I couldn't ever get it to work conditionally
let myTimer = setInterval(timeTimer, 1000);

function timeTimer() {
    quizTimerEl.text(timeLeft); 
    timeLeft--;
    scoreHolderEl.text(score);
   };

function stopTimer() {
    clearInterval(myTimer);
};

// Create a function to locally store Initials, Score, and Date
function setLocalScores() {
    let userInitials = prompt("Congratulations! You scored " + score + " points! \n What are your intitals?");
    let scoreRow = [];
    scoreRow = JSON.parse(localStorage.getItem("highScores"));
    scoreRow += userInitials + " got " + score + " point(s) on " + Date();
    localStorage.setItem("highScores", JSON.stringify(scoreRow));

    // console.log(scoreRow);
    $answerHolder.children().remove();
    quizTimerEl.remove();
    console.log(scoreRow[1]);
    $answerHolder.text(scoreRow).addClass('class="text-white"');
        // for( index = 0; index < scoreRow.length; index++) {
        //     $answerHolder.append('<p class="col-sm-12 bg-secondary text-white">' + scoreRow[index] + '>/p>');
        // }
    }
    


// Add an event listener for the Start Quiz! button
$startQuiz.on('click', startQuiz);
$answer1.on('click', answerClick);
$answer2.on('click', answerClick);
$answer3.on('click', answerClick);
$answer4.on('click', answerClickCorrect);
