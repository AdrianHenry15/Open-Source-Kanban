const { Post } = require('../models');

const postdata = [
    {
        title: 'Donec posuere metus vitae ipsum.',
        post_text: 'rwtgrwt4w25hwrtwtgrwtgwrtgw245hgwrt',
        user_id: 10
    }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;