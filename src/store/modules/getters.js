import {floatNumberWithSpaces} from "@/utils/handlers.js";

export const getters = {
    formatCalcSum() {
        if (this.calcSum) {
            return floatNumberWithSpaces(this.calcSum);
        }
        return null;
    },
}