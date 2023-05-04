import axios from "axios";

export default {
    api: axios.create({
        baseURL: "https://4c14-90-85-237-137.ngrok-free.app/api",
    })
}