/**
 * 底部的一些操作
 */

var AppDispatcher = require("../dispatcher");

var Footer = React.createClass({

	getInitialState:function(){
		return {
			selected:""
		};
	},

	//	checkbox值发生变化响应
	changed:function(condition){
		this.setState({
			selected:condition
		});
		AppDispatcher.dispatch({
			actionType:"SHOW_FILTER",
			condition:condition
		});
	},

	//	删除已完成的todo
	clearCompleted:function(){
		AppDispatcher.dispatch({
			actionType:"CLEAR_COMPLETED"
		});
	},

	//	渲染底部布局
	render:function(){
		var selected = this.state.selected;
		return (
				<div className="todo-footer">
					<div className="footer-left">
						<label className="chosen-label">
							<input type="checkbox" checked={selected === true} onChange={this.changed.bind(this,true)} />
							已完成
						</label>
						<label className="chosen-label">
							<input type="checkbox" checked={selected === false} onChange={this.changed.bind(this,false)} />
							未完成
						</label>
						<label className="chosen-label">
							<input type="checkbox" checked={selected === ""} onChange={this.changed.bind(this,"")} />
							所有
						</label>
					</div>
					<div className="footer-right">
						<button onClick={this.clearCompleted} className="del-btn-big">删除已完成的</button>
					</div>
				</div>
			);
	}
});

module.exports = Footer;