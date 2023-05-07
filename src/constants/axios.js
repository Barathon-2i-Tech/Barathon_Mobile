import axios from "axios";

export default {
    api: axios.create({
        baseURL: "https://3daa-2a01-cb14-18e-5800-8c53-3af5-3d96-12ec.ngrok-free.app/api",
    })
}