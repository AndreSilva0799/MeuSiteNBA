var fantasyTeams = {
    team1: {},
    team2: {}
};

var savedVotes = JSON.parse(localStorage.getItem('savedVotes')) || {};
var savedFantasyTeams = JSON.parse(localStorage.getItem('savedFantasyTeams')) || {};

var liveScores = [
    {
        teamA: "Time 1",
        teamB: "Time 2",
        scoreA: 0,
        scoreB: 0,
        timeRemaining: "1º Quarto"
    },
   
];
function submitVote(pollId) {
    var selectedOption = document.querySelector('input[name="pollOption' + pollId.charAt(pollId.length - 1) + '"]:checked');

    if (selectedOption) {
        var resultElement = document.getElementById('result' + pollId.charAt(pollId.length - 1));
        var correctAnswer = getCorrectAnswer(pollId);

        console.log("selectedOption.value:", selectedOption.value);
        console.log("correctAnswer:", correctAnswer);

        if (selectedOption.value === correctAnswer) {
            resultElement.style.color = 'green';
            resultElement.innerHTML = 'Seu voto foi registrado para: ' + selectedOption.value + ' (Resposta Correta!)';
        } else {
            resultElement.style.color = 'red';
            resultElement.innerHTML = 'Seu voto foi registrado para: ' + selectedOption.value + ' (Resposta Incorreta!)';
        }

        // Salvar voto no localStorage
        savedVotes[pollId] = selectedOption.value;
        localStorage.setItem('savedVotes', JSON.stringify(savedVotes));
    } else {
        alert('Por favor, selecione uma opção antes de votar.');
    }
}

// Função fictícia para obter a resposta correta com base no pollId
function getCorrectAnswer(pollId) {
    switch (pollId) {
        case 'pollContainer1':
            return 'lakers';
        case 'pollContainer2':
            return 'lebron';
        case 'pollContainer3':
            return 'hornets';
        case 'pollContainer4':
            return 'popovich';
        default:
            return '';
    }
}


function submitFantasyTeam(team) {
    var player1 = document.getElementById('player1_' + team).value;
    var player2 = document.getElementById('player2_' + team).value;
    var player3 = document.getElementById('player3_' + team).value;
    var player4 = document.getElementById('player4_' + team).value;

    var teamObj = {
        player1: player1,
        player2: player2,
        player3: player3,
        player4: player4
    };

    fantasyTeams[team] = teamObj;

    var fantasyResult = document.getElementById('fantasyResult_' + team);
    fantasyResult.innerHTML = 'Time salvo! Jogadores escolhidos: ' + player1 + ', ' + player2 + ', ' + player3 + ', ' + player4;

    // Salvar time no localStorage
    savedFantasyTeams[team] = teamObj;
    localStorage.setItem('savedFantasyTeams', JSON.stringify(savedFantasyTeams));
}

var discussionMessages = [];

function submitDiscussionMessage() {
    var username = document.getElementById('username').value;
    var message = document.getElementById('message').value;

    if (username && message) {
        var newMessage = {
            username: username,
            message: message
        };

        discussionMessages.push(newMessage);

        // Limpar os campos do formulário
        document.getElementById('username').value = '';
        document.getElementById('message').value = '';

        // Atualizar a lista de discussões
        updateDiscussionList();

        var discussionResult = document.getElementById('discussionResult');
        discussionResult.innerHTML = 'Mensagem enviada com sucesso!';
    } else {
        alert('Por favor, preencha todos os campos antes de enviar.');
    }
}

function updateDiscussionList() {
    var discussionList = document.getElementById('discussionList');
    discussionList.innerHTML = '';

    discussionMessages.forEach(function (message) {
        var listItem = document.createElement('li');
        listItem.innerHTML = '<strong>' + message.username + ':</strong> ' + message.message;
        discussionList.appendChild(listItem);
    });
}

var liveScores = [];

function addLiveScore(teamA, teamB, score, timeRemaining) {
    var game = {
        teamA: teamA,
        teamB: teamB,
        score: score,
        timeRemaining: timeRemaining
    };

    liveScores.push(game);
    updateLiveScoreTable();
}

function updateLiveScoreTable() {
    var liveScoreBody = document.getElementById('liveScoreBody');
    liveScoreBody.innerHTML = '';

    liveScores.forEach(function (game) {
        var row = document.createElement('tr');
        row.innerHTML =
            '<td>' + game.teamA + '</td>' +
            '<td>' + game.teamB + '</td>' +
            '<td>' + game.score + '</td>' +
            '<td>' + game.timeRemaining + '</td>';

        liveScoreBody.appendChild(row);
    });
}

var currentQuestionIndex = 0;
var quizQuestions = [
    {
        question: "Qual time venceu mais títulos na NBA?",
        options: ["A)Los Angeles Lakers", "B) Boston Celtics", "C) Chicago Bulls", "D) Golden State Warriors"],
        correctAnswer: "B) Boston Celtics"
    },
    {
        question: "Quem detém o recorde de pontos em uma única partida na NBA?",
        options: ["A) LeBron James", "B) Kobe Bryant", "C) Michael Jordan", "D) Wilt Chamberlain"],
        correctAnswer: "D) Wilt Chamberlain"
    },
    {
        question: "Quantos times fazem parte da NBA?",
        options: ["A) 28", "B) 30", "C) 32", "D) 34"],
        correctAnswer: "B) 30"
    }
];

function startQuiz() {
    currentQuestionIndex = 0;
    updateQuiz();
}

function updateQuiz() {
    var questionElement = document.getElementById('question');
    var optionsElement = document.getElementById('options');

    if (currentQuestionIndex < quizQuestions.length) {
        var currentQuestion = quizQuestions[currentQuestionIndex];

        questionElement.textContent = currentQuestion.question;

        optionsElement.innerHTML = '';
        for (var i = 0; i < currentQuestion.options.length; i++) {
            var option = document.createElement('div');
            option.className = 'option';
            option.textContent = currentQuestion.options[i];
            option.addEventListener('mouseover', function () {
                this.style.backgroundColor = '#ddd';
                this.style.cursor = 'pointer';
            });
            option.addEventListener('mouseout', function () {
                this.style.backgroundColor = '';
            });
            option.onclick = function () {
                checkAnswer(this.textContent);
            };
            optionsElement.appendChild(option);
        }
    } else {
        questionElement.textContent = '';
        optionsElement.innerHTML = '';
        document.getElementById('quizResult').textContent = 'Quiz concluído!';
    }
}

function checkAnswer(selectedAnswer) {
    var currentQuestion = quizQuestions[currentQuestionIndex];
    var resultElement = document.getElementById('quizResult');
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
        resultElement.style.color = 'green';
        resultElement.textContent = 'Resposta correta! ' + selectedAnswer;
    } else {
        resultElement.style.color = 'red';
        resultElement.textContent = 'Resposta incorreta. Tente novamente! ' + selectedAnswer;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    updateQuiz();
}

// Iniciar o quiz ao carregar a página
startQuiz();


var comments = [];

function addComment() {
    var commentUser = document.getElementById('commentUser').value;
    var commentText = document.getElementById('commentText').value;

    if (commentUser && commentText) {
        var newComment = {
            user: commentUser,
            text: commentText
        };

        comments.push(newComment);

        // Limpar os campos do formulário
        document.getElementById('commentUser').value = '';
        document.getElementById('commentText').value = '';

        // Atualizar a lista de comentários
        updateCommentList();
    } else {
        alert('Por favor, preencha todos os campos antes de adicionar um comentário.');
    }
}

function updateCommentList() {
    var commentList = document.getElementById('commentList');
    commentList.innerHTML = '';

    comments.forEach(function (comment) {
        var listItem = document.createElement('li');
        listItem.innerHTML = '<strong>' + comment.user + ':</strong> ' + comment.text;
        commentList.appendChild(listItem);
    });
}

// Iniciar a lista de comentários ao carregar a página
updateCommentList();
