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
        game.questions = new Array();
        game.correctCount = 0;
        game.wrongCount = 0;
        game.currentCorrect = "";
        game.currentGuess = "";

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
                let questionObject = new QSlide(category, question, correct, answers);
                game.questions.push(questionObject);
            })
            game.newQuestion();
        });
    },

    game : ()=>{
        
    },

    newQuestion : ()=>{
        let questionObject = game.questions.pop();
        game.currentCorrect = questionObject.correct;
        $("#question-area").html(questionObject.slide);
        let answers = $(".question-slide li");

        answers.each(function(){

            $(this).on("click", ()=>{

                game.currentGuess = $(this).html();
                
                game.checkAnswer();
            })
        })
    },

    checkAnswer : ()=>{
        if (game.currentGuess === game.currentCorrect){
            game.correctCount += 1;
            game.showResult("correct");
        }
        else{
            game.wrongCount += 1;
            game.showResult("incorrect");
        }
        setTimeout(game.continue, 300);
    },

    showResult : (result)=>{
        outcomes = {
            correct : "Congrats, that's correct!",
            incorrect : "Sorry, that's wrong",
        }
        let resultSlide = $("<div>").addClass(result + "-slide");
        let message = $("<p>").append(outcomes[result]);
        resultSlide.append(message);
        let gif = $("<img>").attr("src", "assets/images/"+result+".gif");
        resultSlide.append(gif);

        $("#question-area").html(resultSlide);
    },

    continue : ()=>{
        if(game.questions.length){
            game.newQuestion();
        }
        else{
            game.endGame();
        }
    },

    endGame : ()=>{
        let endSlide = $("<div>").addClass("end-slide");
        let message = $("<h1>").html("Game Over");
        endSlide.append(message);
        let correctCountMessage = $("<h2>").html("Correct answers: "+game.correctCount);
        endSlide.append(correctCountMessage);
        let wrongCountMessage = $("<h2>").html("Wrong answers: "+game.wrongCount);
        endSlide.append(wrongCountMessage);
        if (game.correctCount > game.wrongCount){
            gifURL = "goodEnd.gif";
        }
        else{
            gifURL = "badEnd.gif";
        }
        let gif = $("<img>").attr("src", "assets/images/"+gifURL);
        endSlide.append(gif);

        let newGameButton = $("<button>").html("New Game?")
        endSlide.append(newGameButton);
        newGameButton.on("click", game.newGameSetup);

        $("#question-area").html(endSlide);
    }
}

game.newGameSetup();