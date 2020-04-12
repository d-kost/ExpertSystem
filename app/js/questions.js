let Question = function(id, text) {
    this.id = id;
    this.text = text;
    this.answer = null; //true or false
}


function getQuestions() {
    return {
        0: new Question(0, 'Есть ли невыполненные лабораторные работы?'),
    
        1: new Question(1, 'Скоро дедлайн?'),
    
        2: new Question(2, 'Сегодня работали более 6 часов?'),
    
        3: new Question(3, 'Готов ли диплом?'),
    
        // 4: new Question(4, 'test 4'),
    
        // 5: new Question(5, 'test 5')
        
    }

}