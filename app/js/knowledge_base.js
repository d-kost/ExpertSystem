let type = {
    string: 'result',
    question: 'question',
    check: 'check',
    nothing: 'nothing'
}


let outputs = {
    result_rest: [type.string, 'Отдыхать'],
    result_work: [type.string, 'Работать'],
    result_find_work: [type.string, 'Найти еще работу'],
    result_diplom: [type.string, 'Делать диплом'],
    question_diplom: [type.question, 3],
    question_time: [type.question, 2],

    // test4: [type.question, 4],
    // test5: [type.question, 5],

    // test4_true: [type.string, 'test4 true'],
    // test4_false: [type.string, 'test4 false'],
    // test5_true: [type.string, 'test5 true'],
    // test5_false: [type.string, 'test5 false'],
}



let base = new Map();
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

    for (const iterator of base.entries()) {
        let rule = iterator[0];
        let output = iterator[1] 

        let hasRules = false;
        let result = true;

        //look for rules
        for (let j = 0; j < rule.length; j++) {

            //if rule is found
            if (j % 2 == 0 && rule[j] == currentId) {
                hasRules = true;

                //check all conditions in the current rule
                const resultCheck = checkRule(rule);
         
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

    return [type.nothing, null];
  
}  


    
function checkRule(rule) {
    //return question index to asking or true
    //or false when one of the conditions is not true
    
    let res = true;
    for (let i = 0; i < rule.length; i++) {
        let item = rule[i];

        if (i % 2 == 0) {
            let answer = questions[item].answer;
            if (answer == null) {
                //if question has no answer then ask 
                return item;
            } else {
                if (answer != rule[i+1]) {
                    res = false;
                    break;
                }
            }   
        }
    }

    return res;
}