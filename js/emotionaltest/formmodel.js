class FormModel {

    /**
     * Constructor de la clase FormModel.
     *
     * @param {string} EMOTIONAL_FORM_SELECTOR Selector CSS para el formulario emocional.
     * @param {string} SUBMIT_BUTTON_SELECTOR Selector CSS para el botón de envío del formulario.
     * @param {string} FORM_QUESTION_PREFIX Prefijo común para todos los selectores de preguntas del formulario.
     * @param {string} FORM_QUESTION_SUFIX Sufijo común para todos los selectores de preguntas del formulario.
     * @param {int} MAX_QUESTION Numéro máximo de preguntas en el formulario.
     * @param {int} START_INDEX Índice de inicio en las preguntas del formulario; por defecto 0.
     */
    constructor(
        EMOTIONAL_FORM_SELECTOR,
        SUBMIT_BUTTON_SELECTOR,
        FORM_QUESTION_PREFIX,
        FORM_QUESTION_SUFIX,
        MAX_QUESTION,
        START_INDEX = 0,
    ) {
        this.EMOTIONAL_FORM_SELECTOR = EMOTIONAL_FORM_SELECTOR;
        this.SUBMIT_BUTTON_SELECTOR = SUBMIT_BUTTON_SELECTOR;
        this.FORM_QUESTION_PREFIX = FORM_QUESTION_PREFIX;
        this.FORM_QUESTION_SUFIX = FORM_QUESTION_SUFIX;
        this.MAX_QUESTION = MAX_QUESTION,
            this.START_INDEX = START_INDEX
    }

    /**
     * Genera el selector CSS específico para una pregunta con el ID especificado.
     *
     * @param {number} id ID de la pregunta.
     * @returns {string} Selector CSS completo para la pregunta especificada.
     */
    GetQuestionSelector(id) {
        return this.FORM_QUESTION_PREFIX + id + this.FORM_QUESTION_SUFIX;
    }

    /**
     * Obtiene el objeto DOM correspondiente al contenedor de una pregunta con el ID especificado.
     *
     * @param {number} id ID de la pregunta.
     * @returns {HTMLElement} Objeto DOM del contenedor de la pregunta especificada.
     */
    GetQuestionContainerObject(id) {
        return document.getElementById(this.GetQuestionSelector(id));
    }

    /**
     * Retorna la respuesta dada para una pregunta de un determinado id numérico en el formulario designado.
     * Sigue las reglas establecidas (para seleccionar el contenedor de la pregunta) de prefijo y sufijo uniforme para cada pregunta del formulario.
     *
     * @param {number} id ID de la pregunta.
     * @returns {number|null} Valor de la respuesta seleccionada, o `null` si no se ha seleccionado ninguna respuesta.
     */
    GetQuestionResponseID(id) {
        const CHECKED = this.GetQuestionContainerObject(id).querySelector("input:checked");
        return CHECKED ? Number(CHECKED.getAttribute("value")) : null;
    }

    /**
     * Obtiene un arreglo ordenado con el valor numérico de cada pregunta seleccionada en el formulario.
     *
     * @returns {Array<number>|null} Arreglo con todos los valores de la respuesta a cada pregunta.
     */
    GetResponsesArray() {

        try {
            let RESPONSES_ARRAY = [];

            for (let i = this.START_INDEX; i <= this.START_INDEX + this.MAX_QUESTION; i++) {
                const RESPONSE = this.GetQuestionResponseID(i);
                RESPONSES_ARRAY.push(RESPONSE);
            }

            return RESPONSES_ARRAY;

        }
        catch {
            console.error(`Error: no se puede procesar la respuesta a una pregunta del formulario
                        (fuera de índice o selector no válido).`);
            return null;
        }
    }

}



export { FormModel }