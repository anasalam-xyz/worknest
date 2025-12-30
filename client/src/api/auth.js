import API from "./axios";

export const getUserInfo = async () => {
    const res = await API.post("/auth/profile");
}