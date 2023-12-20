import instance from "./apiConfig";

class PostService {
    async getAllPosts() {
        try {
            const res = await instance.get("/post");
            return res;
        } catch (error) {
            return error;
        }
    }

    async deletePost(postId) {
        try {
            const res = await instance.delete(`/post/${postId}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}

export const postService = new PostService();