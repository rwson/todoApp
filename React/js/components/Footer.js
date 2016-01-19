/**
 * 底部的一些操作
 */

var Footer = React.createClass({

	//	checkbox值发生变化响应,调用传入的回调
	changed:function(state){
		var arg;
		if(state === "done"){
			arg = true;
		} else if(state === "no-done") {
			arg = false;
		} else {
			arg = "";
		}
		this.props.onPress(arg,state);
	},

	//	渲染底部布局
	render:function(){
		var selected = this.props.selected;
		return (
				<div className="todo-footer">
					<div className="footer-left">
						<label className="chosen-label">
							<input type="checkbox" checked={selected === "done"} onChange={this.changed.bind(this,"done")} />
							已完成
						</label>
						<label className="chosen-label">
							<input type="checkbox" checked={selected === "no-done"} onChange={this.changed.bind(this,"no-done")} />
							未完成
						</label>
						<label className="chosen-label">
							<input type="checkbox" checked={selected === ""} onChange={this.changed.bind(this,"")} />
							所有
						</label>
					</div>
					<div className="footer-right">
						<button onClick={this.props.clearCompleted} className="del-btn-big">删除已完成的</button>
					</div>
				</div>
			);
	}
});

module.exports = Footer;