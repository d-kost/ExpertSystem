'use strict';

var Question = function Question(text, actions) {
    this.text = text;
    this.actions = actions;
};

Question.prototype.getNextQuestion = function (answer) {
    if (answer == 'yes') {
        return this.actions[0];
    }
    if (answer == 'no') {
        return this.actions[1];
    }
    return null;
};

var questions = {
    0: new Question('Есть ли невыполненные лабораторные работы?', [1, 2]),

    1: new Question('Скоро дедлайн?', ['Делать лабораторные', 2]),

    2: new Question('Сегодня работали более 6 часов?', ['Отдыхать', 3]),

    3: new Question('Готов ли диплом?', ['Найти еще работу', 'Делать диплом'])

};

var currentState = void 0;

function setCurrentState(state) {
    currentState = state;

    document.querySelector('#question').textContent = currentState.text;
}

function setResult(result) {
    document.querySelector('.options').classList.add('hidden');
    document.querySelector('#question').textContent = result;
}

function clickAnswer(answer) {

    var nextQuestion = currentState.getNextQuestion(answer);

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