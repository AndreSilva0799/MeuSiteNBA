function submitFeedback() {
    var feedback = document.getElementById('feedback').value;

    if (feedback.trim() !== '') {
        // Adicione o feedback à lista de melhorias
        var improvementsList = document.getElementById('improvementsList');
        var listItem = document.createElement('li');
        listItem.textContent = feedback;
        improvementsList.appendChild(listItem);

        // Armazene o feedback no localStorage
        var storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        storedFeedbacks.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));

        // Limpe o campo de feedback após enviar
        document.getElementById('feedback').value = '';
    } else {
        alert('Por favor, forneça um feedback antes de enviar.');
    }
}

function listFeedbacks() {
    // Recupere os feedbacks do localStorage
    var storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    // Exiba os feedbacks na lista
    var improvementsList = document.getElementById('improvementsList');
    improvementsList.innerHTML = '';

    storedFeedbacks.forEach(function (feedback) {
        var listItem = document.createElement('li');
        listItem.textContent = feedback;
        improvementsList.appendChild(listItem);
    });
}