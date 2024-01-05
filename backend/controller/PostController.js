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

  async getPost(req, res) {
    try{
      const postId = req.params.postId;
      const post = await Post.findById(postId).populate("user", "userName").populate("comments.user", "userName");
      if(post){
        return res.status(200).send(post);
      }else{
        return res.status(500).send("No post by that Id")
      }
    }catch(err){
      return res.status(500).send();
    }
  }

  async createPost(req, res) {
    const { title, category, content } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(400).send("No user")
    }
    if (!title || !category || !content) {
      return res.status(400).send("Missing content");
    }
    let newPost = {
      user: user._id,
      title: title,
      content: content,
      category: category,
      comments: []
    }
    const updatedPost = await Post.create(newPost);
    return res.status(201).send("Post created successfully");
  }

  async createComment(req, res) {
    const user = req.user;
    if (!user) {
      return res.status(400).send("No user")
    }
    const { postId, content } = req.body;
    if(!postId || !content || postId === "" || content === ""){
      return res.status(400).send("Invalid request")
    }

    try {
      const newPost = await Post.findByIdAndUpdate(postId, { $push: { comments: { user: user._id, content: content } }}, {new: true}).populate("comments.user", "userName");
      return res.status(201).send(newPost.comments);
    } catch (error) {
      return res.status(500).send("Unable to post comment")
    }
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