/**
 * Script de la lógica principal para hacer un "cast" de las respuestas del formulario "test"
 * Procesa la información del formulario y obtiene el diagnóstico final
 */


import { EmotionalTest } from "./emotionaltest.js";




const FORM_MODEL = new EmotionalTest.FormModel(
    "emotional_test_form", //EMOTIONAL_FORM_SELECTOR
    "emotional_form_submit_button", //SUBMIT_BUTTON_SELECTOR
    "p", //FORM_QUESTION_PREFIX
    "", //FORM_QUESTION_SUFIX
    29, //MAX_QUESTION
    0, //START_INDEX
);


// Construye un objeto de la clase DiagnosisSetting
// Contiene el array asociativo que relaciona el índice de las preguntas con el diagnóstico de las mismas
const DIAGNOSIS_SETTING = new EmotionalTest.DiagnosisSetting(
    {
        "ANSIEDAD": [4, 10, 15, 21, 27],
        "BIPOLARIDAD": [3, 9, 14, 20, 26,],
        "DEPRESION": [0, 3, 6, 17, 23],
        "DESPERSONALIZACION": [2, 8, 19, 25, 28],
        "TDAH": [1, 7, 12, 18, 24],
        "VARIOS TRANSTORNOS": [5, 11, 16, 22, 29],
    }, //DIAGNOSIS_REL
);





















const TRIGGER = document.getElementById(FORM_MODEL.SUBMIT_BUTTON_SELECTOR);

TRIGGER.addEventListener('click', function (event) {
    event.preventDefault(); //evita que el formulario se envíe (para que no se actualice la página)



    const PROCESS_USER_RESPONSE = new EmotionalTest.UserResponse(FORM_MODEL, DIAGNOSIS_SETTING, 5);


    
    const DIAGNOSTIC_KEY_NAME = DIAGNOSIS_SETTING.GetDiagnosisKey(PROCESS_USER_RESPONSE.DeduceDiagnosisID());


    document.querySelector("main").innerHTML = "USTED TIENE " + DIAGNOSTIC_KEY_NAME;

})

