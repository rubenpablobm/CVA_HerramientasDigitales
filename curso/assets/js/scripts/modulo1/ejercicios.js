var elem_answers = ['temperatura', 'precipitación', 'viento', 'humedad', 'presión atmosférica', 'nubosidad'];
var elem_answered = [];

var factores_answers = ['latitud', 'vientos predominantes', 'corrientes marinas', 'distancia al mar', 'altitud', 'relieve'];
var factores_answered = [];

function check01() {
    var answer = document.getElementsByClassName('answer-01')[0].value;
    document.getElementsByClassName('answer-01')[0].value = ''; // RESET VALUE

    answer = answer.toLowerCase().trim();

    if (elem_answers.find(element => element == answer) != undefined) {
        elem_answered.push(answer);
        elem_answers.splice(elem_answers.indexOf(answer), 1);

        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(answer));
        document.getElementsByClassName('elementos-ul')[0].appendChild(entry);

        document.getElementsByClassName('score1')[0].innerHTML = elem_answered.length + '/4';

        if (elem_answered.length >= 4) {
            document.getElementsByClassName('score1')[0].style.color = "green";
        }
    }
}

function check02() {
    var answer = document.getElementsByClassName('answer-02')[0].value;
    document.getElementsByClassName('answer-02')[0].value = ''; // RESET VALUE

    answer = answer.toLowerCase().trim();

    if (factores_answers.find(element => element == answer) != undefined) {
        factores_answered.push(answer);
        factores_answers.splice(factores_answers.indexOf(answer), 1);

        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(answer));
        document.getElementsByClassName('factores-ul')[0].appendChild(entry);

        document.getElementsByClassName('score1')[1].innerHTML = factores_answered.length + '/4';

        if (factores_answered.length >= 4) {
            document.getElementsByClassName('score1')[1].style.color = "green";
        }
    }
}


function check03() {
    var answers = [3, 5, 6, 9, 10];
    var count = 1;
    var count2 = 6;

    var spans = document.getElementsByClassName('checkboxes')[0].getElementsByTagName('span');
    var elems1 = document.getElementsByClassName('left-side')[0].getElementsByTagName('input');
    var elems2 = document.getElementsByClassName('right-side')[0].getElementsByTagName('input');

    for (var i = 0; i < 5; i++) {
        var curr = elems1[i];
        var curr2 = elems2[i];

        if (curr.checked && answers.find(element => element == count)) {
            answers.splice(answers.indexOf(count), 1);
            spans[count - 1].style.color = 'green';
        } else if (answers.find(element => element == count)) {
            spans[count - 1].style.color = 'red';
        } else {
            spans[count - 1].style.color = 'green';
        }
        
        if (curr2.checked && answers.find(element => element == count2)) {
            answers.splice(answers.indexOf(count2), 1);
            spans[count2 - 1].style.color = 'green';
        } else if (answers.find(element => element == count2)) {
            spans[count2 - 1].style.color = 'red';
        } else {
            spans[count2 - 1].style.color = 'green';
        }

        count++;
        count2++;
    }

    if (answers.length == 0) {
        document.getElementsByClassName('button-check')[0].getElementsByClassName('score')[0].innerHTML = "¡Felicidades!";
    }

    document.getElementsByClassName('check03')[0].disabled = true;

    // DEPLOY MODAL
    setTimeout(() => {
        $("#info2").modal('hide');
        $("#info5").modal();
    }, 1000);
}


function check04() {
    var count = 0;
    var answers = {0:'c', 1:'d', 2:'e', 3:'b', 4:'a'};
    var spans = document.getElementsByClassName('act3-answers')[0].getElementsByTagName('span');
    var answered = document.getElementsByClassName('act3-answers')[0].getElementsByTagName('input');

    for (var i = 0; i < 5; i++) {
        if (answered[i].value.toLocaleLowerCase().trim() == answers[i]) {
            count++;
            spans[i].style.color = 'green';
        } else {
            answered[i].value = answers[i].toUpperCase();
            spans[i].style.color = 'red';
        }
    }

    document.getElementsByClassName('check04')[0].disabled = true;

    if (count == 5) {
        document.getElementsByClassName('congrats-banner')[0].innerHTML = "¡Felicidades!";
    } else {
        document.getElementsByClassName('congrats-banner')[0].innerHTML = "Revisa tus respuestas";
    }
}


function ejercicio01() {
  const answers = ["mitigación al cambio climático", "adaptación al cambio climático"];
  var correct = 0;

  $('#info6 .centered-btn button')[0].disabled = "true";

  if ($('#info6 #answer1')[0].value.toLowerCase() == answers[0]) {
      $('#info6 #answer1')[0].style.backgroundColor = "#00800052";
      correct++;
  } else {
      $('#info6 #answer1')[0].style.backgroundColor = "#c7000030";
  }

  if ($('#info6 #answer2')[0].value.toLowerCase() == answers[1]) {
      $('#info6 #answer2')[0].style.backgroundColor = "#00800052";
      correct++;
  } else {
      $('#info6 #answer2')[0].style.backgroundColor = "#c7000030";
  }

  $('#info6 .centered-btn p')[0].innerHTML = correct + " / 2";
}


function ejercicio03() {
  let answers = {0:'I', 1:'C', 2:'C', 3:'I', 4:'I', 5:'I', 6:'I', 7:'I', 8:'I', 9:'', 10:'I', 11:'C', 12:'I'};
  let correct = 0;
  var tableRows = document.getElementById('info7').getElementsByTagName('tr');

  for (var i = 0; i < 14; i++) {
      if (i == 0) { i = 1; }
      var rowAnswers = tableRows[i].getElementsByTagName('td')[2].getElementsByTagName('div');
      let answIndv = rowAnswers[0].getElementsByTagName('input')[0].checked;
      let answColect = rowAnswers[1].getElementsByTagName('input')[0].checked;

      if (i == 10 && answColect && answIndv) {
          correct++; 
          tableRows[i].style.backgroundColor = '#dbf3db'; 
      } else if (i == 10) { 
          tableRows[i].style.backgroundColor = '#ffdcdc'; 
      } else if ((answers[i - 1] == 'I' && answIndv) || (answers[i - 1] == 'C' && answColect)) {
          tableRows[i].style.backgroundColor = '#dbf3db';
          correct++;
      } else {
          tableRows[i].style.backgroundColor = '#ffdcdc';
      }
  }

  document.getElementById('info7').getElementsByClassName('centered-btn')[0].getElementsByTagName('button')[0].disabled = 'true';
  document.getElementById('info7').getElementsByClassName('centered-btn')[1].getElementsByTagName('p')[0].innerHTML = correct + " / 13";
}






const btn_left = document.querySelector('.btn_left');
const btn_right = document.querySelector('.btn_right');
var count = 0;
var correct = 0;
let touchstartX = 0
let touchendX = 0
let correct_incorrect = "";

function next_card() {
    const btn_left = document.querySelector('.btn_left');
    const btn_right = document.querySelector('.btn_right');

    // Check if theres a right checkRight()
    if (checkSides(1)) {
        if (get_current_id() == 1) {
            // remove disabled from button
            btn_left.disabled = false;
        }
        
        // Show next quiz card
        hideCard(get_current_id());
        hideCard(get_current_id() + 1);
        showCard(get_current_id() + 1);

        setTimeout(() => {
            if (checkSides(1) == false) {
                btn_right.disabled = true;
                btn_left.disabled = true;

                checkScore();
            }
        }, 300)
    }
}

function previous_card() {
    const btn_left = document.querySelector('.btn_left');
    const btn_right = document.querySelector('.btn_right');

    if (checkSides(-1)) {
        if (checkSides(1) && get_current_id() > 1) {
            hideCard(get_current_id());
            hideCard(get_current_id() - 1);
            showCard(get_current_id() - 1);
        }

        setTimeout(() => {
            if(get_current_id() == 1) {
                btn_left.disabled = true;
            }
        }, 500)

        btn_right.disabled = false;
    }
}


function checkSides(num) {
    centerElement = get_current_id();
    var myEle = document.getElementById('card-' + (centerElement + num));


    if (myEle || centerElement < 1) {
        // It exists
        return true;
    } else {
        // Doesn't exist
        return false;
    }
}

function get_current_id() {
    return parseInt(document.querySelector('.is-shown').id.replace('card-',''));
}

function hideCard(card_id) {
    document.getElementById('card-' + String(card_id)).classList.add('hiding');
    setTimeout(() => {
        document.getElementById('card-' + String(card_id)).classList.remove('is-shown');
    }, 300)

    setTimeout(() => {
        document.getElementById('card-' + String(card_id)).classList.remove('hiding');
    }, 400)
}

function showCard(card_id) {
    setTimeout(() => {
        document.getElementById('card-' + String(card_id)).classList.add('is-shown');
    }, 300)
}

function checkQuestion(card_option) {
    if (card_option.classList.contains('correct')) {
        card_option.style.borderColor = "#6d9d3263";
        card_option.style.borderWidth = "8px";
        correct_incorrect = 'correct';
        correct++;
    } else {
        card_option.style.borderColor = "#d8474777";
        card_option.style.borderWidth = "8px";
        correct_incorrect = 'wrong';
    }

    document.getElementById('card-' + String(get_current_id())).getElementsByClassName('quiz-card-answer_options')[0].style.pointerEvents = "none";
}

function checkScore() {
    const quiz_cards = document.querySelectorAll('.quiz-card');
    count = quiz_cards.length - 1;

    let score = correct / count * 100;

    let currCard = document.getElementById('card-' + String(get_current_id()));

    // Renders correct
    if (score == 100) {
        document.querySelector(".quiz-feedback.feedback-100").style.display = "flex";
        currCard.querySelector(".quiz-card-question").querySelectorAll("h2")[0].style.display = "block";
        currCard.querySelector(".quiz-card-answer_options").querySelectorAll("p")[0].style.display = "block";
    } else if (score >= 70) {
        document.querySelector(".quiz-feedback.feedback-70").style.display = "flex";
        document.querySelectorAll(".score-circle")[1].innerHTML = score.toFixed(0).toString() + "%";
        currCard.querySelector(".quiz-card-question").querySelectorAll("h2")[1].style.display = "block";
        currCard.querySelector(".quiz-card-answer_options").querySelectorAll("p")[1].style.display = "block";
    } else {
        document.querySelector(".quiz-feedback.feedback-60").style.display = "flex";
        document.querySelectorAll(".score-circle")[2].innerHTML = score.toFixed(0).toString() + "%";
        currCard.querySelector(".quiz-card-question").querySelectorAll("h2")[2].style.display = "block";
        currCard.querySelector(".quiz-card-answer_options").querySelectorAll("p")[2].style.display = "block";
    }
}

function checkDirection() {
    let diff = touchendX - touchstartX;
    diff = Math.abs(diff);

    if (touchendX < touchstartX && diff > 60) {
        next_card();
    }

    if (touchendX > touchstartX && diff > 60) {
        previous_card();
    }
}

function eventListenerAdd() {
    const card_options = document.querySelectorAll('.answer_options-option');

    card_options.forEach(card_option => {
        card_option.addEventListener("click", function() {
            checkQuestion(card_option);
        });
    });
}

function eventListenerSwipeAdd() {
    const cards = document.querySelectorAll('.quiz-card');

    cards.forEach(card => {
        card.addEventListener("touchstart", e => {
            touchstartY = e.changedTouches[0].screenY;
            touchstartX = e.changedTouches[0].screenX;
        });

        card.addEventListener("touchend", e => {
            touchendY = e.changedTouches[0].screenY;
            touchendX = e.changedTouches[0].screenX;
            checkDirection();
        });
    });
}

eventListenerAdd();
eventListenerSwipeAdd();