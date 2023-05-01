import axios from "axios";

export default {
  api: axios.create({
    baseURL: `https://2e54-2a01-cb14-18e-5800-c9e-6f94-9f8c-1e56.ngrok-free.app/api`,
  }),
};
