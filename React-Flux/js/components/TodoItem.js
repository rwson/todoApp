/**
 * 具体的列表项
 */

var AppDispatcher = require("../dispatcher");

var TodoItem = React.createClass({

	//	改变一个todo的状态
	dealOne:function(id){
		AppDispatcher.dispatch({
			actionType:"TODO_UPDATE",
			id:id
		});
	},

	//	删除一个todo
	deleteOne:function(id){
		AppDispatcher.dispatch({
			actionType:"TODO_DESTROY",
			id:id
		});
	},

	//	渲染每一项
	renderItem:function(data){
		var self = this;
		var keys = Object.keys(data);
		var res;
		var each;
		return !data ? 
		null 
		:
		keys.map(function(item,index){
			item = data[item];
			if(item.done){
				res = <li key={item.id} className="todo-item done-todo">
						<input type="checkbox" checked={item.complete} onChange={self.dealOne.bind(self,item.id)}/>
				 		<del>{item.title}</del>
				 		<button onClick={self.deleteOne.bind(self,item.id)} className="del-btn">删除</button>
				 	</li>;
			} else {
				res = <li key={item.id} className="todo-item">
						<input type="checkbox" checked={item.complete} onChange={self.dealOne.bind(self,item.id)}/>
				 		{item.title}
				 		<button onClick={self.deleteOne.bind(self,item.id)} className="del-btn">删除</button>
				 	</li>
			}
			return res;
		});
	},

	//	渲染整个todo列表
	render:function(){
		var data = this.props.data;
		return (
				<ul>
					{this.renderItem(data)}
				</ul>
			);
	}
});

module.exports = TodoItem;