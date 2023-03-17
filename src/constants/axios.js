import axios from "axios";
import {API_URL} from "@env"

export default {
    api: axios.create({
        baseURL: `${API_URL}`
    })
}