const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id: {type: String, require: true},
    title: {type: String, requires: true},
    content: {type: String, require: true},
    category: {type: String},
    comments: [
        {
            type: new mongoose.Schema(
                {
                    user_id: {type: String, require: true},
                    content: {type: String, require: true}
                }, {timestamps: true}
            )

        }
    ]
}, {timestamps: true});

module.exports = mongoose.model("post", postSchema);