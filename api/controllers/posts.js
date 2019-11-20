const mongoose = require("mongoose");

const Post = require("../models/post");
const User = require("../models/user");

const UserController = require("./user");

exports.get_posts = (req, res, next) => {
  Post.find({ 'creator': req.userData.userId })
    .select("_id title imageUrl content creator")
    .populate("creator", "_id")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        Posts: docs.map(doc => {
          return {
            _id: doc._id,
            title: doc.title,
            imageUrl: doc.imageUrl,
            content: doc.content,
            creator: doc.creator,
            request: {
              type: "GET",
              url: "http://localhost:3000/posts/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.create_post = (req, res, next) => {
  User.findById(req.userData.userId )
    .then(user => {
      if (!user) {
        return res.status(404).json({ 
          message: "User not found"
        });
      }
      const post = new Post({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        content: req.body.content,
        creator: req.userData.userId
      });
      return post.save();
    })
    .then(result => {
      UserController.user_updatePosts(req.userData.userId);
      res.status(201).json({
        message: "Post succesfully created",
        createdPost: {
          _id: result._id,
          title: result.title,
          imageUrl: result.imageUrl,
          content: result.content,
          creator: req.userData.userId
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/posts/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_post = (req, res, next) => {
  Post.findById(req.params.postId)
    .populate("creator", "_id")
    .exec()
    .then(post => {
      if (!post) {
        return res.status(404).json({
          message: "Post not found"
        });
      }
      res.status(200).json({
        post: post,
          request: {
            type: "GET",
            url: "http://localhost:3000/posts"
          }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.edit_post = (req, res, next) => {
  const postId = req.params.postId;
  const updateOps = {};

  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }

  Post.updateOne({ _id: postId }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/posts/" + postId
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_post = (req, res, next) => {
  Post.remove({ _id: req.params.postId })
    .exec()
    .then(result => {
      UserController.user_updatePosts(req.userData.userId);
      res.status(200).json({
        message: "Post deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/posts",
          body: { postId: "ID", title: "String", imageUrl: "String", content: "String",creator: "ID" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};