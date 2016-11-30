'use strict';
var SlackBot = require('slackbots');

var main = function(){
    
    // create a bot
    var bot = new SlackBot({
        token: 'xoxb-109978401488-AiqvA2nVPnKmH61calkFRoiI', // Add a bot https://my.slack.com/services/new/bot and put the token 
        name: 'fxxk bot'
    });
    
    bot.on('start', function() {
        // more information about additional params https://api.slack.com/methods/chat.postMessage
        var params = {
            icon_emoji: ':cat:'
        };
        
        // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
        bot.postMessageToChannel('general', 'meow!', params);
        
        // define existing username instead of 'user_name'
        bot.postMessageToUser('kiarsnieve', 'meow!', params); 
        
        // If you add a 'slackbot' property, 
        // you will post to another user's slackbot channel instead of a direct message
        bot.postMessageToUser('rssh', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
        
        // define private group instead of 'private_group', where bot exist
        bot.postMessageToGroup('test-bot', 'meow!', params); 
    });
};
main();
