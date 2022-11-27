import axios from "axios";

export default {
    api : axios.create({
        baseURL: "https://5022-2a01-cb14-1bb-bf00-299a-791-3ba7-2b1.eu.ngrok.io/api",
    })
}