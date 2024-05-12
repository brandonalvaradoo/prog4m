class UserResponse {

    constructor(FORM_MODEL, DIAGNOSIS_SETTING, MAX_LEVEL_RESPONSE) {
        this.FORM_MODEL = FORM_MODEL;
        this.DIAGNOSIS_SETTING = DIAGNOSIS_SETTING;
        this.MAX_LEVEL_RESPONSE = MAX_LEVEL_RESPONSE;
    }



    GetDiagnosisScoresResult() {
        const RESPONSES = this.FORM_MODEL.GetResponsesArray();
        const ALL_DIAGNOSIS_COUNTERS = new Array(this.DIAGNOSIS_SETTING.GetDiagnosisCount());

        for (let i = 0; i < ALL_DIAGNOSIS_COUNTERS.length; i++) ALL_DIAGNOSIS_COUNTERS[i] = 0;


        for (let i = 0; i < this.FORM_MODEL.MAX_QUESTION; i++) {
            const RELATED_DIAGNOSIS_ID = this.DIAGNOSIS_SETTING.GetDiagnosisIDFromRelatedQuestion(i);

            if (RELATED_DIAGNOSIS_ID === undefined) continue;

            const RESPONSE_VALUE = RESPONSES[i];

            if (RESPONSE_VALUE === null) continue;

            console.log(RELATED_DIAGNOSIS_ID, "==>")
            console.log(RESPONSE_VALUE)



            const SCORE = (1 / (this.DIAGNOSIS_SETTING.GetDiagnosisCount() - 1)) * RESPONSE_VALUE;

            ALL_DIAGNOSIS_COUNTERS[RELATED_DIAGNOSIS_ID] += SCORE;
        }

        return ALL_DIAGNOSIS_COUNTERS;
    }

    DeduceDiagnosisID() {
        return this.EvaluateResponsesScores(this.GetDiagnosisScoresResult());
    }


    EvaluateResponsesScores(RESPONSES_SCORES_ARRAY) {
        let max = 0;
        let max_id = RESPONSES_SCORES_ARRAY[0];

        for (let i = 0; i < RESPONSES_SCORES_ARRAY.length; i++) {
            if (RESPONSES_SCORES_ARRAY[i] > max) {
                max = RESPONSES_SCORES_ARRAY[i];
                max_id = i;
            }
        }

        return max_id;
    }

}


export { UserResponse }