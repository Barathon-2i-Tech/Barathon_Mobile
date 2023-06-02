import axios from "axios";

export default {
  api: axios.create({
    baseURL: `https://00bd-90-85-237-137.ngrok-free.app/api`,
  }),
};
