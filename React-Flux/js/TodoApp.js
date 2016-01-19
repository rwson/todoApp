var AppDispatcher = require("./dispatcher");
var Store = require("./stores");

var TodoItem = require("./components/TodoItem");
var InputForm = require("./components/InputForm");
var Footer = require("./components/Footer");

var TodoApp = React.createClass({

	//	获取所有的todo数据
	getInitialState:function(){
		return {
			data:Store.getTodos()
		};
	},

	//	渲染todo数据
	render:function(){
		return (<div className="todo-container">
					<InputForm>
					</InputForm>
					<TodoItem data={this.state.data}>
					</TodoItem>
					<Footer>
					</Footer>
				</div>);
	},

	//	组件被销毁,移除事件监听
	componentWillUnmount:function(){
		Store.removeListener("change", this._onChange);
	},

	//	组件被实例化完成
	componentDidMount:function(){
		Store.on("change", this._onChange);
	},

	//	响应组件state发生改变
	_onChange:function(){
		this.setState({
			data:Store.getTodos()
		});
		this.forceUpdate();
	}
});

module.exports = TodoApp;