/**
 * 输入框
 */

var InputForm = React.createClass({

	//	渲染整个顶部输入框
	render:function(){
		return (
				<div className="input-form">
					<input type="text" onKeyUp={this.props.inputChanged} placeholder="请输入" />
				</div>
			);
	}
});

module.exports = InputForm;