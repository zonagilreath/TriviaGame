class QSlide {
    constructor(category, question, correct, answers){
        this.category = category;
        this.question = question;
        this.correct = correct;
        this.answers = answers;
        this.slide = this.makeSlide();
    }

    makeSlide(){
        const slide = $("<div>").addClass("question-slide");
        const question = $("<p>");
        question.html(this.question);
        slide.append(question);
        const answerList = $("<ul>");
        this.answers.forEach((answer)=>{
            const li = $("<li>");
            li.html(answer);
            answerList.append(li);
        });
        slide.append(answerList);
        
        return slide
    }
}

game = {  
    newGameSetup : () => {
        const URL = "https://opentdb.com/api.php?amount=10&category=20";
        $.ajax({
            url : URL,
            method : "GET",
        }).then((response)=>{
            results = response.results;
            results.forEach((result)=>{
                category = result.category;
                question = result.question;
                correct = result.correct_answer;
                answers = result.incorrect_answers;
                answers.push(correct);
                const questionObject = new QSlide(category, question, correct, answers);
                questions.push(questionObject);
                // console.log(questionObject.question);
                console.log(questionObject.slide);
                $("#question-area").append(questionObject.slide);
            })
        });
    },

    gameInit : ()=>{
        this.questions = new Array();
        this.correctCount = 0;
        this.wrongCount = 0;
        this.currentCorrect = "";
        this.currentGuess = "";
    },

    newQuestion : ()=>{

    },

    checkAnswer : ()=>{

    },

    showResult : ()=>{

    },

    questionRound : ()=>{

    },

    endGame : ()=>{

    }
}

