import axios from "axios";

const instance = axios.create({
    baseURL: "https://admin.wonulla.to",
});

export default instance;