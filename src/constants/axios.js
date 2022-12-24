import axios from "axios";

export default {
    api : axios.create({
        baseURL: "https://c4e4-2a02-8429-5c5e-5a01-c5e4-a139-f3d1-47d6.eu.ngrok.io/api",
    })
}