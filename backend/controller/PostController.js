const Post = require("../model/PostModel");

class PostController {
    async getAllPosts(req, res) {
        try {
            const data = await Post.find().populate("user", "userName").populate("comments.user", "userName");
            return res.status(200).send(data);
          } catch (error) {
            console.log(error);
            return res.status(500).send();
          }
    }

    async createPost(req, res) {
      const {title, category, content} = req.body;
      const user = req.user;
      if(!title || !category || !content){
        return res.status(400).send("Missing content");
      }
      let newPost = {
        user: user._id,
        title: title,
        content: content,
        category: category,
        comments: []
      }
      await Post.create(newPost);
      return res.status(201).send("Post created");
    }

    async deletePost(req, res) {
        const postId = req.params.postId;
      
        try {
          const data = await Post.findByIdAndDelete(postId);
          return res.status(200).send("Post deleted");
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
      };
}

module.exports = new PostController()