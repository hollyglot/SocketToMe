/**
* Meeting.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
        type: 'string'
    },

    password: {
        type: 'string'
    },

    currentQuestion: {
        model: 'question'
    },

    currentAction: {
        type: 'string',
        enum: ['wait', 'respond', 'review'],
        defaultsTo: 'wait'
    },

    questions: {
        collection: 'question'
    }

  }
};

