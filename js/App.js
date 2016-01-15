var TodoItem = require("./components/TodoItem");
var InputForm = require("./components/InputForm");
var Footer = require("./components/Footer");

var App = React.createClass({
	getInitialState:function(){
		return {
			tempText:"",	//	输入框的值
			selected:"",	//	底部选中的状态
			temp:[],		//	存储数据,用来中转
			data:[]			//	存储数据,用来渲染
		};
	},

	//	添加一个todo项
	addTodo:function(){
		var data = this.state.data;
		var title = this.state.tempText;
		if(!title){
			alert("请输入标题!");
			return;
		}
		var item = {
			title:title,								//	用户输入的标题
			id:(new Date()).getTime().toString(32),		//	根据当前时间戳生成的字符串
			done:false									//	完成状态
		};
		data.push(item);
		this.setState({
			data:data,
			temp:data,
			tempText:""
		});
	},

	//	改变一个todo的状态
	dealOne:function(id){
		var temp;
		var res = this.state.data.map(function(item,index){
			temp = item;
			if(item.id == id){
				temp.done = !temp.done;
			}
			return temp;
		});
		this.setState({
			data:res,
			temp:res
		});
	},

	//	删除一个todo项
	deleteOne:function(id){
		var data = this.state.data;
		data = data.filter(function(item,index){
			return item.id !== id;
		});
		this.setState({
			data:data,
			temp:data
		});
	},

	//	响应输入框键盘抬起事件
	inputChanged:function(ev){
		var target = ev.target;
		var which = ev.which;
		if(which == 13){
			this.addTodo();
			target.value = "";
		}else{
			this.setState({
				tempText:target.value
			});
		}
		return false;
	},

	//	响应底部几个过滤按钮的操作
	onPress:function(state,selected){
		var data = this.state.temp;
		var res = data.filter(function(item,index){
			return (typeof state)  === "boolean" ? 
			item.done === state
			:
			item;
		});
		this.setState({
			data:res,
			selected:selected
		});
	},

	//	响应底部"清除已完成"按钮的点击
	clearCompleted:function(){
		var data = this.state.temp;
		var res = data.filter(function(item,index){
			return item.done === false;
		});
		this.setState({
			data:res,
			temp:res
		});	
	},

	//	渲染布局
	render:function(){
		return (
				<div className="todo-container">
					<InputForm 
						inputChanged={this.inputChanged}>
					</InputForm>
					<TodoItem 
						data={this.state.data}
						dealOne={this.dealOne}
						deleteOne={this.deleteOne}
					>
					</TodoItem>
					<Footer
						selected={this.state.selected}
						onPress={this.onPress}
						clearCompleted={this.clearCompleted}
					>
					</Footer>
				</div>
			);
	}
});

React.render(<App/>, document.getElementById("todo"));