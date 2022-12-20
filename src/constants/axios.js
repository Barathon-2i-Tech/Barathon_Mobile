import axios from "axios";

export default {
    api : axios.create({
        baseURL: "https://2552-2a01-cb14-1bb-bf00-6647-9173-b5c4-8fe9.eu.ngrok.io/api",
    })
}