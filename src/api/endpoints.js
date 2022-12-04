import {http} from "./index.js";

class Api {
    async request(config) {
        const {data} = await http.request(config);
        return data;
    }

    async getCasKey(data) {
        return await this.request({
            method: 'post',
            url: '/api/v1/auth/cas',
            data: data
        })
    }
    async getDollarRate(){
        return await this.request({
            url: '/api/v1/exchanges',
            method: 'get'
        })
    }
    async calculate(data) {
        return await this.request({
            method: 'post',
            url: '/api/v1/product/rate',
            data
        })
    }

    async getUserData() {
        return await this.request({
            method: 'get',
            url: '/api/v1/user'
        })
    }

    async getDocuments(productCode) {
        return await this.request({
            method: 'get',
            url: `/api/v1/product/document?productCode=${productCode}`
        })
    }

    async generateDocument(data) {
        return await this.request({
            method: 'post',
            url: `/api/v1/product/document`,
            data: data,
            responseType: 'blob',
        })
    }

    async searchManager(data) {
        return await this.request({
            method: 'get',
            url: `/api/v1/product/agent?agentName=${data}`
        })
    }
}

export const api = new Api()
