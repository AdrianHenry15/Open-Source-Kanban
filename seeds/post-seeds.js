const { Post } = require('../models');

const postdata = [
    {
        title: 'Donec posuere metus vitae ipsum.',
        post_text: 'rwtgrwt4w25hwrtwtgrwtgwrtgw245hgwrt',
        user_id: 10
    },
    {
        title: 'Morbi non quam nec dui luctus rutrum.',
        post_text: 'rwgw425gwrtbrwttrwgrt',
        user_id: 8
    },
    {
        title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
        post_text: 'rwtgwrtgrwtg45gwrtbrwgrtgwr',
        user_id: 1
    },
    {
        title: 'Nunc purus.',
        post_text: 'twrgrwferfwrtgw45grthrwt',
        user_id: 4
    },
    {
        title: 'Pellentesque eget nunc.',
        post_text: 'wregwrtbrwtgwrtgwertg324',
        user_id: 7
    },
    {
        title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        post_text: 'rtw54wgrtbertgrwtgfrefwer',
        user_id: 4
    },
    {
        title: 'In hac habitasse platea dictumst.',
        post_text: 'grwtgwr5w4tbwrtberwt',
        user_id: 1
    },
    {
        title: 'Morbi non quam nec dui luctus rutrum.',
        post_text: 'rtwh425gwrtbrwtgrwtgrtwg',
        user_id: 1
    },
    {
        title: 'Duis ac nibh.',
        post_text: 'rwtbwrtgewrtgw45w24tbrwtbwrt',
        user_id: 9
    },
    {
        title: 'Curabitur at ipsum ac tellus semper interdum.',
        post_text: 'rwthg42w5hrwtbretgrwtrwt',
        user_id: 5
    },
    {
        title: 'In hac habitasse platea dictumst.',
        post_text: 'rtrwegtgrwg45gwrtwr',
        user_id: 3
    },
    {
        title: 'rtwwrtgrwgwertgw45',
        post_text: 'ertwrtbertbrewtbrw45',
        user_id: 10
    },
    {
        title: 'Donec dapibus.',
        post_text: 'rtbnertbwrtw4rt',
        user_id: 8
    },
    {
        title: 'Nulla tellus.',
        post_text: 'rtbwrtwrtgw45425h',
        user_id: 3
    },
    {
        title: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
        post_text: 'brwtw425nbrwtbret',
        user_id: 3
    },
    {
        title:
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
        post_text: 'rwtbwrtbrwtw45h4',
        user_id: 7
    },
    {
        title: 'In hac habitasse platea dictumst.',
        post_text: 'brtbwrtbwrt245g42',
        user_id: 6
    },
    {
        title: 'Etiam justo.',
        post_text: 'rtbwrtbwrtbw445b4t',
        user_id: 4
    },
    {
        title: 'Nulla ut erat id mauris vulputate elementum.',
        post_text: 'eqrveqrweqretynetyner',
        user_id: 6
    },
    {
        title: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        post_text: 'qervqevqervqer',
        user_id: 7
    }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;