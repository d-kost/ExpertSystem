let currentState;

function setCurrentState(state) {
    currentState = state;

    document.querySelector('#question').textContent = currentState.text;
}

function setResult(result) {
    document.querySelector('.options').classList.add('hidden');
    document.querySelector('#question').textContent = result;
}

function clickAnswer(answer) {
    
    let nextQuestion = currentState.getNextQuestion(answer);

    if (typeof nextQuestion == 'string') {
        setResult(nextQuestion);

    } else {
        setCurrentState(questions[nextQuestion]);
    }

}


function newClick() {
    document.querySelector('.options').classList.remove('hidden');
    initNew();
}

function initNew() {
    setCurrentState(questions[0]);
}

function contentLoaded() {
    initNew();
}



document.addEventListener('DOMContentLoaded', contentLoaded);