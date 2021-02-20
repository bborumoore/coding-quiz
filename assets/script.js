// Code snippet allows alert to be dismissed.
$('.alert').alert()

// variables to hold the different html tags I need to work with
let $startQuiz = $("#start-quiz");
let $answerHolder = $("#answer-holder");
let $questionHolder = $("#question-holder");



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

// Next, we'll build the function that transitions the page to the Code Quiz Layout
function startQuiz() {
    // Remove the Start Quiz! button
    $startQuiz.remove();

    // Declaring overall indexer to track question number
    let i = 0;

    // Next, we'll load the first Question into the appropriate place
    $questionHolder.text(questionArr[i].question);
    console.log(questionArr[i].question);

    
    // Create 4 buttons to store the answers
    for (j = 0; j < questionArr[i].answers.length; j++) {
        $answerHolder.children().append(questionArr[i].answers[j]);
        console.log(questionArr[i].answers[j]);
    }
    

}

// Add an event listener for the Start Quiz! button
$startQuiz.on('click', startQuiz);
