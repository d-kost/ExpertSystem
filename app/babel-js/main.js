'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var type = {
    string: 'result',
    question: 'question',
    check: 'check',
    nothing: 'nothing'
};

var outputs = {
    result_rest: [type.string, 'Отдыхать'],
    result_work: [type.string, 'Работать'],
    result_find_work: [type.string, 'Найти еще работу'],
    result_diplom: [type.string, 'Делать диплом'],
    question_diplom: [type.question, 3],
    question_time: [type.question, 2]

    // test4: [type.question, 4],
    // test5: [type.question, 5],

    // test4_true: [type.string, 'test4 true'],
    // test4_false: [type.string, 'test4 false'],
    // test5_true: [type.string, 'test5 true'],
    // test5_false: [type.string, 'test5 false'],
};

var base = new Map();
base.set([0, true, 1, false, 2, true], outputs.result_rest);
base.set([0, true, 1, true], outputs.result_work);
base.set([0, true, 1, false, 2, false], outputs.question_diplom);
base.set([0, false, 2, false], outputs.question_diplom);
base.set([0, false, 2, true], outputs.result_rest);

base.set([3, true], outputs.result_find_work);
base.set([3, false], outputs.result_diplom);

// base.set([3, true], outputs.test4);
// base.set([3, false], outputs.test5);

// base.set([4, true], outputs.test4_true);
// base.set([4, false], outputs.test4_false);

// base.set([5, true], outputs.test5_true);
// base.set([5, false], outputs.test5_false);


function searchBase(currentId) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

        for (var _iterator = base.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var iterator = _step.value;

            var rule = iterator[0];
            var output = iterator[1];

            var hasRules = false;
            var result = true;

            //look for rules
            for (var j = 0; j < rule.length; j++) {

                //if rule is found
                if (j % 2 == 0 && rule[j] == currentId) {
                    hasRules = true;

                    //check all conditions in the current rule
                    var resultCheck = checkRule(rule);

                    if (resultCheck === false) {
                        result = false;
                    } else if (resultCheck !== true) {
                        return [type.check, resultCheck];
                    }
                }

                if (!result) {
                    break;
                }
            }
            if (result && hasRules) {
                return output;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return [type.nothing, null];
}

function checkRule(rule) {
    //return question index to asking or true
    //or false when one of the conditions is not true

    var res = true;
    for (var i = 0; i < rule.length; i++) {
        var item = rule[i];

        if (i % 2 == 0) {
            var answer = questions[item].answer;
            if (answer == null) {
                //if question has no answer then ask 
                return item;
            } else {
                if (answer != rule[i + 1]) {
                    res = false;
                    break;
                }
            }
        }
    }

    return res;
}
var Question = function Question(id, text) {
    this.id = id;
    this.text = text;
    this.answer = null; //true or false
};

function getQuestions() {
    return {
        0: new Question(0, 'Есть ли невыполненные лабораторные работы?'),

        1: new Question(1, 'Скоро дедлайн?'),

        2: new Question(2, 'Сегодня работали более 6 часов?'),

        3: new Question(3, 'Готов ли диплом?')

        // 4: new Question(4, 'test 4'),

        // 5: new Question(5, 'test 5')

    };
}
var currentState = void 0;
var checkedQuestion = void 0;
var questions = void 0;

function setResult(result) {

    document.querySelector('.options').classList.add('hidden');
    document.querySelector('#question').textContent = result;
}

function clickAnswer(answer) {

    checkedQuestion.answer = answer;

    var _searchBase = searchBase(currentState.id),
        _searchBase2 = _slicedToArray(_searchBase, 2),
        result_type = _searchBase2[0],
        result_executor = _searchBase2[1];

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