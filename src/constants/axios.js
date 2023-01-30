import axios from "axios";

export default {
    api: axios.create({
        baseURL: "https://8786-2a01-cb14-18e-5800-c120-4033-b392-bbc8.eu.ngrok.io/api",
    })
}