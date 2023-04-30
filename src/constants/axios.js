import axios from "axios";

export default {
  api: axios.create({
    baseURL: `https://b001-2a01-cb14-18e-5800-54ed-b289-974f-42a1.ngrok-free.app/api`,
  }),
};
