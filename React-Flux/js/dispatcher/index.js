var Dispatcher = require("flux").Dispatcher;
var AppDispatcher = new Dispatcher();
var Store = require("../stores");

AppDispatcher.register(function(action) {
    var text;
    switch (action.actionType) {

        //  新增一个todo项
        case "CREATE_TODO":
            {
                text = action.text.trim();
                if (!!text) {
                    Store.createTodo(text);
                    Store.emit("change");
                } else {
                    alert("请先输入标题");
                }
            }
            break;

        //  删除所有已完成的
        case "CLEAR_COMPLETED":
            {
                Store.destroyCompleted();
                Store.emit("change");
            }
            break;

        //  根据id删除一个todo
        case "TODO_DESTROY":
            {
                Store.destoryById(action.id);
                Store.emit("change");
            }
            break;

        //  根据条件显示
        case "SHOW_FILTER":
            {
                Store.filter(action.condition);
                Store.emit("change");
            }
            break;

        //  更新一个todo项
        case "TODO_UPDATE":
            var allTodos = Store.getTodos();
            var id = action.id;
            var currentTodo = allTodos[id]; {
                Store.update(action.id, {
                    complete: !currentTodo.complete
                });
            }
            Store.emit("change");
            break;
        default:
    }
});

module.exports = AppDispatcher;
