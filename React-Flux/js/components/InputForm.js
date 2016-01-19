/**
 * 输入框
 */

var AppDispatcher = require("../dispatcher");

var InputForm = React.createClass({

	//	响应键盘抬起事件
	handleKeyUp:function(ev){
		var target = ev.target;
		if(ev.keyCode == 13){
			AppDispatcher.dispatch({
				actionType:"CREATE_TODO",
				text:target.value
			});
			target.value = "";
		}
	},

	//	渲染整个顶部输入框
	render:function(){
		return (
				<div className="input-form">
					<input type="text" onKeyUp={this.handleKeyUp} placeholder="请输入" />
				</div>
			);
	}
});

module.exports = InputForm;