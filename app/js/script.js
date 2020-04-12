let currentState;
let checkedQuestion;
let questions;


function setResult(result) {
    
    document.querySelector('.options').classList.add('hidden');
    document.querySelector('#question').textContent = result;
}

function clickAnswer(answer) {
    
    checkedQuestion.answer = answer;
   
    let [result_type, result_executor] = searchBase(currentState.id);

    
    switch (result_type) {
        case type.check:
            setNewCheckedQuestion(result_executor);
            break;
        
        case type.question:
            currentState = questions[result_executor];
            setNewCheckedQuestion(result_executor);
            break;

        case type.string:
            setResult(result_executor);
            break;

        case type.nothing:
            setResult('Knowledge base is not complete');
            break;

    }


}

function setNewCheckedQuestion(index) {
    checkedQuestion = questions[index];
    document.querySelector('#question').textContent = checkedQuestion.text; 
}


function clickNew() {
    document.querySelector('.options').classList.remove('hidden');
    initNew();
}

function initNew() {
    questions = getQuestions();
    setNewCheckedQuestion(0);
    currentState = questions[0];
}

function contentLoaded() {
    initNew();
}



document.addEventListener('DOMContentLoaded', contentLoaded);