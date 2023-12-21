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

    async getPendingUsers() {
        try {
          const res = await instance.get("/user/pendingUsers");
          return res;
        } catch (error) {
            console.log(error);
          return error;
        }
    }

    async requestPending() {
        try {
            const res = await instance.post("/user/pending");
            return res;
        } catch (error) {
            return error;
        }
    }
    
    async verifyUser(userId) {
        try {
            const res = await instance.post(`/user/verified`, { userId });
            return res;
          } catch (error) {
            return error;
          }
    }

    async refuseUser(userId) {
        try {
            const res = await instance.post(`/user/refused`, { userId });
            return res;
          } catch (error) {
            return error;
          }
    }
}

export const userService = new UserService();