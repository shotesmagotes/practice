var express = require('express');
var http = require('http');
var sockets = require('socket.io');

module.exports = function(app){
    
    var test = app.io
        .of('/test')
        .on('connection', function(socket){
            console.log('user connected');
            socket.on('test', function(data){
                test.emit('test', data);
            });
        
            socket.on('disconnect', function(){
                console.log('user disconnected');
            })
        });
    var group = app.io
        .of('/group')
        .on('connection', function(socket){
            console.log('user connected');
            socket.on('group', function(data){
                group.emit('group', data);
            });
        
            socket.on('disconnect', function(){
                console.log('user disconnected');
            })
        });
    var user = app.io
        .of('/user')
        .on('connection', function(socket){
            console.log('user connected');
            socket.on('user', function(data){
                user.emit('user', data);
            });
        
            socket.on('disconnect', function(){
                console.log('user disconnected');
            })
        });
}