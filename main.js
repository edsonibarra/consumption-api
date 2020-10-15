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

                const arrayWithAnswers = [...question.incorrect_answers]
                arrayWithAnswers.push(question.correct_answer);
                
                // RECORRO EL ARRAY DE LAS RESPUESTAS
                arrayWithAnswers.forEach((answer,index) => {
                    printAnswers(answer,index, indexQuestion);
                })

                console.log(arrayWithAnswers);
                console.log(indexQuestion)
                console.log(question);
            })
        })
}

printQuestions = (questions) => {
    const questionText = `<h4>${questions.question}</h4>`;
    container.innerHTML += questionText;
}
printAnswers = (answer,index, otroindex) => {
    const answerHTML = `<input type = "radio" id ="${otroindex}${index}" name="option-${otroindex}"><label class="label-text" for="${otroindex}${index}">${answer}</label><br>`
    container.innerHTML += answerHTML;
}

