import instance from "./apiConfig";


class UserService {
    async getCurrent() {
        try {
            const res = await instance.get("/user");
            return res;
        } catch (error) {
            return error;
        }
    }
}

export const userService = new UserService();