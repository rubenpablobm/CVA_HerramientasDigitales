var questions = [
  // 1
  {
    text: `¿Es Python un lenguaje de programación?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [
      `Verdadero`, 
      `Falso`,
    ],
  },
  // 2
  {
    text: `Thonny es un lenguaje de programación.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [
      'Verdadero',
      'Falso'
    ],
  },
  // 3
  {
    text: `Existe el tipo de dato de "palabra".`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [
      'Verdadero',
      'Falso'
    ],
  },
  // 4
  {
    text: `Valores booleanos regresan un valor falso o verdadero.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [`Verdadero`, `Falso`],
  },
  // 5
  {
    text: `La función print() despliega lo que está dentro de los paréntesis.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [`Verdadero`, `Falso`],
  },
  // 6
  {
    text: `Python es el lenguaje de programación que se utiliza principalmente en Netflix.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [
      'Verdadero',
      'Falso'
    ],
  },
  // 7
  {
    text: `Python es el lenguaje de programación que más se utiliza en Pinterest.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [
      'Verdadero',
      'Falso'
    ],
  },
  // 8
  {
    text: `Python es un lenguaje de programación perfecto para mantener la eficiencia de una aplicación a través de los años, ya que es de fácil desarrollo, es muy simple de gestionar y soporta un gran volumen de visitas diarias, segun Instagram.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [
      'Verdadero',
      'Falso'
    ],
  },
  // 9
  {
    text: `¿Cómo se utiliza Python en Windows 10?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 2,
    answers: [
      'En la instalacion de aplicaciones.',
      'En la organización de carpetas.',
      'En la preinstalación asistida.',
      'En la instalación de lenguajes.'
    ],
  },
  // 10
  {
    text: `Uber combina otros lenguajes junto a Python:`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [
      'Verdadero',
      'Falso'
    ],
  },
];
questions = questions.sort((a, b) => 0.5 - Math.random());

const answersList = function (answers, correctIndex, id) {
  return answers
    .map((ans, i) => {
      let className = correctIndex === i ? "option correct" : "option";
      return `
        <div class="custom-control custom-radio">
            <input type="radio" class="custom-control-input ${className}" name="radiobutton${id}" />
            <label class="custom-control-label q-option-${i}" for="U13_Q${id}_A${i}">
                ${ans}
            </label>
        </div>
        `;
    })
    .join("");
};

const question = function (
  i,
  { text, incorrectText, correctText, correctIndex, answers }
) {
  const answersHtml = answersList(answers, correctIndex, i);

  return `
        <div class="question col-md-5 col-sm-12 mx-1">
            <p class="question-text">
                ${i + 1}. ${text}
            </p>
            <p class="alertWrong mb-0 font-size-14 font-weight-bold" style="display: none; color: red">
                ${incorrectText}
            </p>
            <p class="alertCorrect mb-0 font-size-14 font-weight-bold" style="display: none; color: green">
                ${correctText}
            </p>
            ${answersHtml}
        </div>
        `;
};

const generateQuestions = function () {
  return questions
    .map((q, i) => {
      return question(i, q);
    })
    .join("");
};

const questionsContainer = document.querySelector("#questions");

const modal = document.querySelector("#modal-fs");
const modalMessage = modal.querySelector("#modal-message");
const modalScore = modal.querySelector("#modal-score");
const correctImg = modal.querySelector("#correct-img");
const incorrectImg = modal.querySelector("#incorrect-img");

document.addEventListener("DOMContentLoaded", function (_) {
  const qs = generateQuestions();
  questionsContainer.insertAdjacentHTML("afterbegin", qs);

  $(".custom-control-label").on("click", function () {
    console.log("clicked");
    if ($(this).siblings().is(":checked")) {
      $(this).siblings().removeAttr("checked");
    } else {
      $(this).siblings().prop("checked", true);
    }
  });

  incorrectImg.style.display = "none";
  correctImg.style.display = "none";
});

function checkAll() {
  var correct = 0;
  var count = 0;

  $("div.question").each(function () {
    count++;
    var elem = $(this);
    $(this).find(".alertCorrect").css("display", "none");
    $(this).find(".alertWrong").css("display", "none");
    $(this).removeClass("correct");
    $(this).removeClass("incorrect");
    var isCorrect = true;
    $(this)
      .find("input.custom-control-input")
      .each(function () {
        if ($(this).hasClass("correct")) {
          if (!$(this).is(":checked")) {
            isCorrect = false;
          }
        } else {
          if ($(this).is(":checked")) {
            isCorrect = false;
          }
        }
      });
    if (isCorrect == true) {
      correct++;
      $(this).find(".alertCorrect").css("display", "block");
      $(this).addClass("correct");
    } else {
      $(this).find(".alertWrong").css("display", "block");
      $(this).addClass("incorrect");
    }
  });
  let score = parseInt((correct * 100) / count);
  modalScore.textContent = `${score} / 100`;

  if (score >= 80) {
    modalMessage.textContent = "¡Excelente!";
    incorrectImg.style.display = "none";
    correctImg.style.display = "block";
  } else {
    modalMessage.textContent = "Vuelve a intentarlo...";
    incorrectImg.style.display = "block";
    correctImg.style.display = "none";

    if (score < 25) {
      alert(
        "Le recomendamos volver a leer esta sección para tener mayor puntuaje que 25."
      );
    }
  }
}
