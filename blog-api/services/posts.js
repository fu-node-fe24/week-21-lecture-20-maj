import Post from '../models/post.js';

export async function createNewBlogPost(post) {
    try {
        const result = await Post.create(post);
        return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function getAllPosts() {
    try {
        const result = await Post.find();
        return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function getPostsByUserId(userId) {
    try {
        const result = await Post.find({ userId : userId });
        if(result.length < 1) throw new Error('No post for user');
        else return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function updatePost(postId, newPost) {
    try {
        const result = await Post.findOneAndUpdate({ postId : postId}, newPost);
        return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function deletePost(postId) {
    try {
        const result = await Post.findOneAndDelete({ postId : postId});
        return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}