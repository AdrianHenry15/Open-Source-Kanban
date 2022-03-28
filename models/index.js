const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


//============== Create Associaltions ==============

// User and Post
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment and User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true
});

// Comment and Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks: true
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks: true
});

module.exports = { User, Post, Comment }