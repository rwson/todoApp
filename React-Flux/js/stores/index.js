var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var _todos = {};
var _stored = {};

var Store = assign({}, EventEmitter.prototype, {

    //  获取所有todo
    getTodos: function() {
        return _todos;
    },

    //  创建一个todo
    createTodo: function(title) {
        var id = (+new Date() + Math.floor(Math.random() * 99999)).toString(32);
        var item = {
            id: id,
            title: title,
            complete: false
        };
        _todos[id] = item;
        _stored = _todos;
    },

    //  根据id删除todo
    destoryById: function(id) {
        delete _todos[id];
    },

    //  删除已完成的todo
    destroyCompleted: function() {
        for (var id in _todos) {
            if (_todos[id].complete) {
                this.destoryById(id);
            }
        }
        _stored = _todos;
    },

    //  过滤显示
    filter: function(condition) {
        _todos = {};
        if (condition == true) {
            for (var id in _stored) {
                if (_stored[id].complete) {
                    _todos[id] = _stored[id];
                }
            }
        } else if (condition == false) {
            for (var id in _stored) {
                if (!_stored[id].complete) {
                    _todos[id] = _stored[id];
                }
            }
        } else {
            _todos = _stored;
        }
    },

    //  更新一个todo
    update: function(id, item) {
        _todos[id] = assign({}, _todos[id], item);
        _stored = _todos;
    }
});

module.exports = Store;
