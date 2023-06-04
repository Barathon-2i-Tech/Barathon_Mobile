import axios from "axios";

export default {
    api: axios.create({
        baseURL: "https://607c-2a02-842a-d741-5501-c084-62cb-2287-778c.ngrok-free.app/api",
    })
}