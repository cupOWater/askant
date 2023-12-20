const Post = require("../model/PostModel");

class PostController {
    async getAllPosts(req, res) {
        try {
            const data = await Post.find();
        
            return res.status(200).json(data);
          } catch (error) {
            console.log(error);
            return res.status(500).send();
          }
    }

    async deletePost(req, res) {
        const postId = req.params.postId;
      
        try {
          const data = await Post.findById(postId);
      
          await data.remove();
          return res.status(200).json({ message: 'post deleted' });
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
      };
}

module.exports = new PostController()