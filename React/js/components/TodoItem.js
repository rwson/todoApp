/**
 * 具体的列表项
 */

var TodoItem = React.createClass({

	//	改变一个todo的状态,调用传入的方法
	dealOne:function(id){
		this.props.dealOne(id);
	},

	//	删除一个todo
	deleteOne:function(id){
		this.props.deleteOne(id);
	},

	//	渲染每一项
	renderItem:function(data){
		var self = this;
		var res;
		return !data.length ? 
		null 
		:
		data.map(function(item,index){
			if(item.done){
				res = <li key={item.id} className="todo-item done-todo">
						<input type="checkbox" checked={item.done} onChange={self.dealOne.bind(self,item.id)}/>
				 		<del>{item.title}</del>
				 		<button onClick={self.deleteOne.bind(self,item.id)} className="del-btn">删除</button>
				 	</li>;
			} else {
				res = <li key={item.id} className="todo-item">
						<input type="checkbox" checked={item.done} onChange={self.dealOne.bind(self,item.id)}/>
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