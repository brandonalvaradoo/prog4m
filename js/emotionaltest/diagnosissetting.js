class DiagnosisSetting {

    constructor(DIAGNOSIS_REL) {
        const SORTED = this.#SORT_ARRAY(DIAGNOSIS_REL);


        this.DIAGNOSIS_REL = SORTED;
        this.DIAGNOSIS_REL_MAP = new Map(Object.entries(SORTED));

        this.DIAGNOSIS_REL_KEYS = Object.keys(SORTED);
    }


    #SORT_ARRAY(array) {
        const ORDERED_KEYS = Object.keys(array).sort();
        const NEW_ARRAY = {};

        for (const KEY of ORDERED_KEYS) {
            NEW_ARRAY[KEY] = array[KEY];
        }

        return NEW_ARRAY;
    }


    GetDiagnosisRelMap() {
        return this.DIAGNOSIS_REL_MAP;
    }

    GetDiagnosisRelKeys() {
        return this.DIAGNOSIS_REL_KEYS;
    }

    GetDiagnosisID(diagnosiskey) {
        return this.DIAGNOSIS_REL_KEYS.indexOf(diagnosiskey);
    }


    GetDiagnosisKey(diagnosisid) {
        return this.DIAGNOSIS_REL_KEYS[diagnosisid];
    }

    GetDiagnosisCount() {
        return this.DIAGNOSIS_REL_KEYS.length;
    }


    GetDiagnosisIDFromRelatedQuestion(targetquestion) {
        for (const [KEY, value] of Object.entries(this.DIAGNOSIS_REL)) {
            if (value.includes(targetquestion)) {
                return this.GetDiagnosisID(KEY);
            }
        }
    }





}


export { DiagnosisSetting }