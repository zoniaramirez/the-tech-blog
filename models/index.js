const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//User has many post
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

//post belong to user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

//user has many comment
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

//comment belong to user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

//post has many comment
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

//comment belong to post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };