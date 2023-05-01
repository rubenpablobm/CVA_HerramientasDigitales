var questions = [
  // 1
  {
    text: `¿Zoom es multiplataforma?`,
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
    text: `Zoom no es gratuito para uso personal.`,
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
    text: `Zoom no cuenta con planes para empresas.`,
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
    text: `Zoom se puede utilizar en iPhone y Android.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [`Verdadero`, `Falso`],
  },
  // 5
  {
    text: `Es necesaria una cuenta de Zoom para unirse a una llamada?.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [`Verdadero`, `Falso`],
  },
  // 6
  {
    text: `¿Cual es el distintivo de Google meets en comparación a otras aplicaciones de Videoconferencia?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 2,
    answers: [
      `Videollamadas de tiempo ilimitado.`,
      `Espacio en la nube.`,
      'Integración con el ecosistema de Google.',
      'Todas las anteriores.'
    ],
  },
  // 7
  {
    text: `Google meet no tiene una versión gratis. `,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [
      'Verdadero',
      'Falso'
    ],
  },
  // 8
  {
    text: `Algunos de los beneficios de pagar por Google Workplace para añadir funcionalidad a Google Meet son:`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [
      'Grupos de trabajo.',
      'Conseguir algo de espacio para guardar cosas en la nube',
      'Subtítulos instantáneos.',
      'Todas las opciones.'
    ],
  },
  // 9
  {
    text: `¿Existe una versión de paga y una gratuita de Microsoft Teams?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [
      'Verdadero',
      'Falso'
    ],
  },
  // 10
  {
    text: `¿Qué es Microsoft Teams?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 3,
    answers: [
      'Una aplicación de videollamada hecha por Microsoft la cual quiere competir solo con Google.',
      'Una aplicación de videollamada hecha por Microsoft en la cual solo hay versiones en línea.',
      'Una aplicación de videollamada hecha por Microsoft en la cual solo hay versiones de paga.',
      'Una aplicación de colaboración creada para el trabajo híbrido para que usted y su equipo estén informados, organizados y conectados.'
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
