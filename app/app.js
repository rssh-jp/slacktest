'use strict';
var util = require('util');
var SlackBot = require('slackbots');
var async = require('async');

var execMessage = function(bot, data, callback){
    var params = {
        icon_emoji: ':cat:'
    };
    var user = null;
    var command = null;

    var task = [];
    // user情報の取得
    task.push(function(next){
        var user = bot.getUserById(data.user);
        console.log('user : ', user);
        next(null);
    });
    // commandの取得
    task.push(function(next){
        var str = data.text;
        if(str == ''){
            next('err');
            return;
        }
        var colonSplit = str.split(':');
        if(colonSplit.length < 2){
            next('err');
            return;
        }
        command = colonSplit[1];
    });
    // 実処理部
    task.push(function(next){
        switch(command){
        case 'all':
            console.log('++++++++++');
            bot.postMessageToUser('rssh', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
            break;
        default:
            break;
        }
        next(null);
    });
    async.waterfall(task, function(error){
        callback(error);
    });
};

var main = function(){
    
    // create a bot
    var bot = new SlackBot({
        token: 'xoxb-109978401488-Kr0Ve1192ZIwY6bZC6xFsofx', // Add a bot https://my.slack.com/services/new/bot and put the token 
        name: 'fxxk bot'
    });
    
    bot.on('start', function() {
        bot.on('message', function(data){
            switch(data.type){
            case 'message':
                execMessage(bot, data, function(err, res){
                });
                break;
            default:
                break;
            }
        });
        //// more information about additional params https://api.slack.com/methods/chat.postMessage
        //var params = {
        //    icon_emoji: ':cat:'
        //};
        //
        //// define channel, where bot exist. You can adjust it there https://my.slack.com/services 
        //bot.postMessageToChannel('general', 'meow!', params);
        //
        //// define existing username instead of 'user_name'
        //bot.postMessageToUser('tn', 'meow!', params); 
        //
        //// If you add a 'slackbot' property, 
        //// you will post to another user's slackbot channel instead of a direct message
        //bot.postMessageToUser('rssh', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
        //
        //// define private group instead of 'private_group', where bot exist
        //bot.postMessageToGroup('test-bot', 'meow!', params); 
    });
};
main();
