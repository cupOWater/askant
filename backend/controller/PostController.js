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
        const postId = req.params.id;
      
        try {
          const post = await Post.findById(postId);
      
          if (!post) {
            return res.status(404).json({ message: 'Post를 찾을 수 없습니다.' });
          }
      
          await post.remove();
          return res.status(200).json({ message: 'Post가 성공적으로 삭제되었습니다.' });
        } catch (error) {
          return res.status(500).json({ message: '서버 오류로 인해 삭제할 수 없습니다.' });
        }
      };
}

module.exports = new PostController()