import mongoose, { trusted } from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title : {
        type : String,
        required : true,
        maxlength: 20
    },
    text : {
        type : String,
        required : true,
        minlength : 15
    }, 
    userId : {
        type : String,
        required : true,
    },
    postId : {
        type : String,
        required : true,
        unique : true
    },

}, {timestamps : true });

const Post = mongoose.model('Post', postSchema);

export default Post;