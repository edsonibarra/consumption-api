let correctAnswersArr = [];
let ponitsPerCorrect = 20;
let score = 0;
const qq = document.getElementById('n-questions').value; 


function getFilters () {
    const containerHTML = document.getElementById('container')
    const q = document.getElementById('n-questions').value; 
    const c = document.getElementById('category-selected').value;
    const d = document.getElementById('difficulty-selected').value;
    const t = document.getElementById('type-selected').value;

    fetch(`https://opentdb.com/api.php?amount=${q}&category=${c}&difficulty=${d}&type=${t}`)
        .then((response) => response.json())
        .then((loadedQuestions) => {
            // CREO EL ARRAY CON SOLO LAS PREGUNTAS
            const arrayQuestions = loadedQuestions.results;
            // RECORRO EL ARRAY
            arrayQuestions.forEach((question, indexQuestion) => {
                printQuestions(question);
                correctAnswersArr.push(question.correct_answer); 
                const randomNumber = Math.floor(Math.random() * 4)
                console.log(`este es el numero generado ${randomNumber}`)
                const arrayWithAnswers = [...question.incorrect_answers]
                arrayWithAnswers.splice(randomNumber, 0 , question.correct_answer)
                // RECORRO EL ARRAY DE LAS RESPUESTAS
                arrayWithAnswers.forEach((answer,index) => {
                    printAnswers(answer,index, indexQuestion);
                })
                console.log(arrayWithAnswers);
                console.log(indexQuestion)
                console.log(question);
            })
            console.log(correctAnswersArr);
            
            
        })
        
}

printQuestions = (questions) => {
    const questionText = `<h4>${questions.question}</h4>`;
    container.innerHTML += questionText;
}
printAnswers = (answer,index, otroindex) => {
    const answerHTML = `<input class = "input-choice" required value ="${answer}" type = "radio" id ="${otroindex}${index}" name="option-${otroindex}"><label class="label-text" for="${otroindex}${index}">${answer}</label><br>`
    container.innerHTML += answerHTML;
}

// checkAns = () => {
//     let ansSelectedArr = [];
//     const allOptions = Array.from(document.getElementsByClassName('input-choice'));
//     console.log(allOptions);
//     allOptions.forEach( option => {
//         if(option.checked){
//             console.log(option.value)
//             ansSelectedArr.push(option.value)
//         }
//     })
//     console.log(ansSelectedArr);
// }

checkAns = (arr) => {
    let ansSelectedArr = [];
    const allOptions = Array.from(document.getElementsByClassName('input-choice'));
    // console.log(allOptions);
    allOptions.forEach( option => {
        if(option.checked){
            // console.log(option.value)
            ansSelectedArr.push(option.value)
        }
    })
    console.log(ansSelectedArr);
    for(let i = 0; i < correctAnswersArr.length; i++){
        for(let j = 0; j < ansSelectedArr.length; j++){
            if(correctAnswersArr[i] == ansSelectedArr[j]){
                console.log('correct');
                score += ponitsPerCorrect;
            }
        }
    }
    console.log(score);
    giveScore(score);
    
}
function giveScore(num) {
    let containerHTML = document.getElementById('container')
    // containerHTML = "";
    let total = qq*20
    container.innerHTML = `<h2>Your score has been ${num}</h2>`
}