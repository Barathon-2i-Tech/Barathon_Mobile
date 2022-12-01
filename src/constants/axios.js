import axios from "axios";

export default {
    api : axios.create({
        baseURL: "https://c49c-2a01-cb14-1bb-bf00-a46f-b1e6-c888-9aec.eu.ngrok.io/api",
    })
}