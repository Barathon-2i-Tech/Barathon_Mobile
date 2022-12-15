import axios from "axios";

export default {
    api : axios.create({
        baseURL: "https://56d3-2a01-cb14-1bb-bf00-4503-1536-2059-c75d.eu.ngrok.io/api",
    })
}