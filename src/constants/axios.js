import axios from "axios";

export default {
  api: axios.create({
    baseURL: `https://ff1b-2a02-842a-d741-5501-51f3-105-a377-b159.ngrok-free.app/api`,
  }),
};
