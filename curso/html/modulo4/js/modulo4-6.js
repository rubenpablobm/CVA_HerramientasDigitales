var questions = [
  // 1
  {
    text: `¿En qué tres aplicaciones principales consiste Microsoft Office?`,
    correctText: `¡Correcto! las metas son tus acciones o deseos en una dirección específica.`,
    incorrectText: `Incorrecto. Lee de nuevo el texto y verás que una meta no solo sirve en cosas específicas como proyectos y ambiciones si no como tal es tus acciones o deseos dirigidos hacia algo.`,
    correctIndex: 1,
    answers: [
      `Outlook, Docs y Powerpoint`, 
      `Word, Excel y Powerpoint`,
      'Word, Pages y Excel',
      'OneNote, Keynote y Word'
    ],
  },
  // 2
  {
    text: `¿Excel utiliza hojas de cálculo?`,
    correctText: `¡Correcto! Efectivamente sirven para completar nuestros proyectos y ambiciones, los cuales pueden ser cualquier cosa desde mejorar un ámbito de tu vida, a conseguir algún reconocimiento, conseguir algún puesto, entre otras cosas que ya decidirás tú personalmente.`,
    incorrectText: `Incorrecto... Lee detenidamente de nuevo y verás que las metas como tal no son específicamente para completar tus trabajos del día a día o mejorar un aspecto en específico.`,
    correctIndex: 0,
    answers: [
      'Verdadero',
      'Falso'
    ],
  },
  // 3
  {
    text: `Word no es un programa para el procesamiento de texto.`,
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
    text: `Powerpoint es una aplicación para realizar presentaciones.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 0,
    answers: [`Verdadero`, `Falso`],
  },
  // 5
  {
    text: `Microsoft Office tiene una versión en línea disponible gratuitamente.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [`Verdadero`, `Falso`],
  },
  // 6
  {
    text: `¿Qué diferencia Google Workplace a Microsoft Office?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [
      `Google Workplace no tiene ninguna diferencia con Microsoft Office en cuanto a funcionalidades.`,
      `Google Workplace es gratuito hasta cierto punto y contiene más herramientas que Microsoft Office no contiene.`,
      'Google Workplace es en línea y Microsoft Office es lo mismo pero sin tener que tener una conexión a internet.',
      'Google Workplace es gratis y de código abierto, y Microsoft Office cuesta y es un sistema centralizado.'
    ],
  },
  // 7
  {
    text: `¿Cuánto espacio gratuito hay en la nube de Google para que puedas utilizar los diferentes programas de Google Workplace?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 2,
    answers: [
      '45 Gb de espacio.',
      '30 Gb de espacio.',
      '15 Gb de espacio.',
      '20 Gb de espacio.'
    ],
  },
  // 8
  {
    text: `¿Qué es LibreOffice?`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [
      'Programa igual a Microsoft Office en el cual cobran.',
      'Es un programa similar a Microsoft Office, pero hecho con código abierto y totalmente gratis.',
      'Es un programa que solo funciona con linux, porque es de código abierto.',
      'Es un programa que tiene la función de hacer encuestas.'
    ],
  },
  // 9
  {
    text: `LibreOffice está disponible gratuitamente.`,
    correctText: `¡Correcto!`,
    incorrectText: `Incorrecto...`,
    correctIndex: 1,
    answers: [
      'Verdadero',
      'Falso'
    ],
  },
  // 10
  {
    text: `Google Workplace es uno de los programas que más herramientas te ofrece.`,
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
