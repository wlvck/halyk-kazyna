import {api} from "@/api/endpoints.js";

export const actions = {
    async getUserData() {
        try {
            this.userData = await api.getUserData()
        } catch (err) {
            console.log(err)
        } finally {
            this.loading.userName = false;
        }
    },
    async getCasKey(HB_token) {
        const data = {
            source: "homebank",
            key: HB_token
        }
        try {
            this.loading.userName = true;
            const response = await api.getCasKey(data)
            this.access_token = response.access_token
            localStorage.setItem('TOKEN', response.access_token)
        } catch (err) {
            console.log(err)
        }
    },
    async calculateSum(data) {
        try {
            this.loading.annualRate = this.loading.usdExchangeRate = this.loading.insuredSum = true
            const response = await api.calculate(data)

            let formatKzt = parseFloat(response.sum_kzt).toFixed(2);
            let formatUsd = parseFloat(response.sum_usd).toFixed(2);
            this.annualRate = parseFloat(response.annual_effective_rate).toFixed(2)
            this.usd_exchange_rate = response.us_dollar_exchange_rate
            this.product_code = response.product_code
            this.wholeCalcSumObj = response
            if (this.countInDollars) {
                this.calcSum = `${formatUsd} $`
            } else {
                this.calcSum = `${formatKzt} ₸`
            }
        } catch (err) {
            console.log(err)
        } finally{
            this.loading.annualRate = this.loading.usdExchangeRate = this.loading.insuredSum = false
        }
    },
    async getDocuments(documentType) {
        const data = {
            validity: 2,
            product_code: this.product_code ? this.product_code : 1104,
            premium_sum_usd: "1000",
            document_type: documentType
        }
        try {
            return await api.getDocuments(data)
        } catch (err) {
            console.log(err)
        }
    },
    async generateDocument(documentType) {
        const data = {
            validity: 2,
            product_code: this.product_code ? this.product_code : 1104,
            premium_sum_usd: "1000",
            document_type: documentType
        }
        try {
            const response = await api.generateDocument(data)
            const blob = new Blob([response], {type: `application/pdf`});
            return window.URL.createObjectURL(blob);
        } catch (err) {
            console.log(err)
        }
    },
    async searchManager(data) {
        try {
            return await api.searchManager(data)
        } catch (err) {
            console.log(err)
        }
    },
    setCountInDollars(value){
        console.log(value)
        this.countInDollars = value;
        if (this.annualRate) {
            // если true
            if (value) {
                this.calcSum = this.wholeCalcSumObj.sum_usd
                this.prize = this.wholeCalcSumObj.premium_sum_usd
            } else {
                this.calcSum = this.wholeCalcSumObj.sum_kzt
                this.prize = this.wholeCalcSumObj.premium_sum_kzt
            }
        }
    }
}