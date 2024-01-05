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

    async getPost(postId){
        try {
            const res = await instance.get(`/post/${postId}`);
            return res;
        }catch (err){
            return err;
        }
    }

    async createPost(content){
        try {
            const res = await instance.post("/post/create", content);
            return res;
        } catch (error) {
            return error;
        }
    }

    async createComment(postId, content){
        try{
            const res = await instance.post("/post/comment", {postId, content});
            return res;
        }catch (err){
            return err;
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