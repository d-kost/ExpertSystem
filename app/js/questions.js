let Question = function(text, actions) {
    this.text = text;
    this.actions = actions;
}

Question.prototype.getNextQuestion = function(answer) {
    if (answer == 'yes') {
        return this.actions[0];
    }
    if (answer == 'no') {
        return this.actions[1];
    }
    return null;
}


let questions = {
    0: new Question('Есть ли невыполненные лабораторные работы?', [1, 2]),

    1: new Question('Скоро дедлайн?', ['Делать лабораторные', 2]),

    2: new Question('Сегодня работали более 6 часов?', ['Отдыхать', 3]),

    3: new Question('Готов ли диплом?', ['Найти еще работу', 'Делать диплом']),
    
}
