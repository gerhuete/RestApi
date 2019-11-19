const mongoose = require('mongoose');
require('mongoose-type-url');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100
    },
    imageUrl: { type: mongoose.SchemaTypes.Url },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
});

module.exports = mongoose.model('Post', postSchema);