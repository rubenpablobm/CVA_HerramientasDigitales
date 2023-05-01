var questions = [
  // 1
  {
    text: `¿Qué es una meta?`,
    correctText: `¡Correcto! las metas son tus acciones o deseos en una dirección específica.`,
    incorrectText: `Incorrecto. Lee de nuevo el texto y verás que una meta no solo sirve en cosas específicas como proyectos y ambiciones si no como tal es tus acciones o deseos dirigidos hacia algo.`,
    correctIndex: 3,
    answers: [
      `Son con lo que avanzamos nuestros proyectos personales.`, 
      `Son con lo que checamos el progreso de nuestras ambiciones.`,
      'Son con lo que limitamos nuestras ambiciones.',
      'El fin a que se dirigen las acciones o deseos de alguien.'
    ],
  },
  // 2
  {
    text: `¿Para qué sirven las metas?`,
    correctText: `¡Correcto! Efectivamente sirven para completar nuestros proyectos y ambiciones, los cuales pueden ser cualquier cosa desde mejorar un ámbito de tu vida, a conseguir algún reconocimiento, conseguir algún puesto, entre otras cosas que ya decidirás tú personalmente.`,
    incorrectText: `Incorrecto... Lee detenidamente de nuevo y verás que las metas como tal no son específicamente para completar tus trabajos del día a día o mejorar un aspecto en específico.`,
    correctIndex: 2,
    answers: [
      `Para mejorar como personas.`, 
      `Para completar nuestro trabajo escolar o del día a día.`,
      'Para completar nuestros proyectos personales y ambiciones.',
      'Para mejorar y eficientizar como hacemos nuestros proyectos personales.'
    ],
  },
  // 3
  {
    text: `¿Se puede dividir un proyecto en varias metas?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [
      `La ejecución concurrente de dos o más trabajos o procesos al mismo tiempo.`, 
      `Hacer dos o más metas al mismo tiempo.`,
      'Buscar maximizar el tiempo haciendo más de una cosa a la vez.',
      'Prevención de tiempos a la hora que se acerque la fecha de algún proyecto.'
    ],
  },
  // 4
  {
    text: `¿Qué es el ser multitareas según “wordreference”?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [`Verdadero`, `Falso`],
  },
  // 5
  {
    text: `¿Hacer multitareas es la forma más efectiva de hacer los trabajos todo el tiempo?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [`Verdadero`, `Falso`],
  },
  // 6
  {
    text: `¿Android, generalmente, cuenta con qué aplicación de calendario?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [
      `Google Calendar`,
      `Calendario de Apple`,
      'Android Calendar',
      'Windows Calendar'
    ],
  },
  // 7
  {
    text: `¿Pueden ser compartidos los calendarios digitales?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [
      `Verdadero`,
      `Falso`,
    ],
  },
  // 8
  {
    text: `¿Se pueden crear múltiples calendarios dentro de una aplicación de calendario?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [
      `Verdadero`,
      `Falso`,
    ],
  },
  // 9
  {
    text: `No se puede añadir una ubicación a un evento de calendario.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [
      `Verdadero`,
      `Falso`
    ],
  },
  // 10
  {
    text: `incronizar no significa que si uno tiene múltiples dispositivos, lo mismo estará en cada uno de ellos.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
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
