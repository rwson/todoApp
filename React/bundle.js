/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./out/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(2);
	__webpack_require__(6);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./todo.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./todo.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, "* {\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli {\n    list-style: none;\n}\n\n.todo-container {\n    width: 500px;\n    margin: 20px auto 0;\n}\n\n.input-form {\n    width: 100%;\n    height: 30px;\n    margin: 0 0 10px 0;\n}\n\n.input-form input {\n    display: block;\n    width: 100%;\n    text-indent: 5px;\n    height: 30px;\n    font-size: 14px;\n}\n\n.todo-item {\n    width: 100%;\n    height: 15px;\n    clear: both;\n    padding: 5px;\n    border-bottom: 1px solid #ccc;\n}\n\n.done-todo {\n    background: #ccc;\n}\n\n.todo-item span {\n    font-size: 14px;\n    padding: 0 0 0 5px;\n}\n\n.del-btn {\n    float: right;\n}\n\n.todo-footer {\n    clear: both;\n}\n\n.footer-left {\n    float: left;\n}\n\n.footer-right {\n    float: right;\n}\n", ""]);

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	"use strict";

	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var TodoItem = __webpack_require__(7);
	var InputForm = __webpack_require__(10);
	var Footer = __webpack_require__(12);

	var App = React.createClass({
		displayName: "App",

		getInitialState: function getInitialState() {
			return {
				tempText: "", //	输入框的值
				selected: "", //	底部选中的状态
				temp: [], //	存储数据,用来中转
				data: [] //	存储数据,用来渲染
			};
		},

		//	添加一个todo项
		addTodo: function addTodo() {
			var data = this.state.data;
			var title = this.state.tempText;
			if (!title) {
				alert("请输入标题!");
				return;
			}
			var item = {
				title: title, //	用户输入的标题
				id: new Date().getTime().toString(32), //	根据当前时间戳生成的字符串
				done: false //	完成状态
			};
			data.push(item);
			this.setState({
				data: data,
				temp: data,
				tempText: ""
			});
		},

		//	改变一个todo的状态
		dealOne: function dealOne(id) {
			var temp;
			var res = this.state.data.map(function (item, index) {
				temp = item;
				if (item.id == id) {
					temp.done = !temp.done;
				}
				return temp;
			});
			this.setState({
				data: res,
				temp: res
			});
		},

		//	删除一个todo项
		deleteOne: function deleteOne(id) {
			var data = this.state.data;
			data = data.filter(function (item, index) {
				return item.id !== id;
			});
			this.setState({
				data: data,
				temp: data
			});
		},

		//	响应输入框键盘抬起事件
		inputChanged: function inputChanged(ev) {
			var target = ev.target;
			var which = ev.which;
			if (which == 13) {
				this.addTodo();
				target.value = "";
			} else {
				this.setState({
					tempText: target.value
				});
			}
			return false;
		},

		//	响应底部几个过滤按钮的操作
		onPress: function onPress(state, selected) {
			var data = this.state.temp;
			var res = data.filter(function (item, index) {
				return typeof state === "boolean" ? item.done === state : item;
			});
			this.setState({
				data: res,
				selected: selected
			});
		},

		//	响应底部"清除已完成"按钮的点击
		clearCompleted: function clearCompleted() {
			var data = this.state.temp;
			var res = data.filter(function (item, index) {
				return item.done === false;
			});
			this.setState({
				data: res,
				temp: res
			});
		},

		//	渲染布局
		render: function render() {
			return React.createElement(
				"div",
				{ className: "todo-container" },
				React.createElement(InputForm, {
					inputChanged: this.inputChanged }),
				React.createElement(TodoItem, {
					data: this.state.data,
					dealOne: this.dealOne,
					deleteOne: this.deleteOne
				}),
				React.createElement(Footer, {
					selected: this.state.selected,
					onPress: this.onPress,
					clearCompleted: this.clearCompleted
				})
			);
		}
	});

	React.render(React.createElement(App, null), document.getElementById("todo"));

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * 具体的列表项
	 */

	"use strict";

	var TodoItem = React.createClass({
		displayName: "TodoItem",

		//	改变一个todo的状态,调用传入的方法
		dealOne: function dealOne(id) {
			this.props.dealOne(id);
		},

		//	删除一个todo
		deleteOne: function deleteOne(id) {
			this.props.deleteOne(id);
		},

		//	渲染每一项
		renderItem: function renderItem(data) {
			var self = this;
			var res;
			return !data.length ? null : data.map(function (item, index) {
				if (item.done) {
					res = React.createElement(
						"li",
						{ key: item.id, className: "todo-item done-todo" },
						React.createElement("input", { type: "checkbox", checked: item.done, onChange: self.dealOne.bind(self, item.id) }),
						React.createElement(
							"del",
							null,
							item.title
						),
						React.createElement(
							"button",
							{ onClick: self.deleteOne.bind(self, item.id), className: "del-btn" },
							"删除"
						)
					);
				} else {
					res = React.createElement(
						"li",
						{ key: item.id, className: "todo-item" },
						React.createElement("input", { type: "checkbox", checked: item.done, onChange: self.dealOne.bind(self, item.id) }),
						item.title,
						React.createElement(
							"button",
							{ onClick: self.deleteOne.bind(self, item.id), className: "del-btn" },
							"删除"
						)
					);
				}
				return res;
			});
		},

		//	渲染整个todo列表
		render: function render() {
			var data = this.props.data;
			return React.createElement(
				"ul",
				null,
				this.renderItem(data)
			);
		}
	});

	module.exports = TodoItem;

/***/ },
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	/**
	 * 输入框
	 */

	"use strict";

	var InputForm = React.createClass({
		displayName: "InputForm",

		//	渲染整个顶部输入框
		render: function render() {
			return React.createElement(
				"div",
				{ className: "input-form" },
				React.createElement("input", { type: "text", onKeyUp: this.props.inputChanged, placeholder: "请输入" })
			);
		}
	});

	module.exports = InputForm;

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	/**
	 * 底部的一些操作
	 */

	"use strict";

	var Footer = React.createClass({
		displayName: "Footer",

		//	checkbox值发生变化响应,调用传入的回调
		changed: function changed(state) {
			var arg;
			if (state === "done") {
				arg = true;
			} else if (state === "no-done") {
				arg = false;
			} else {
				arg = "";
			}
			this.props.onPress(arg, state);
		},

		//	渲染底部布局
		render: function render() {
			var selected = this.props.selected;
			return React.createElement(
				"div",
				{ className: "todo-footer" },
				React.createElement(
					"div",
					{ className: "footer-left" },
					React.createElement(
						"label",
						{ className: "chosen-label" },
						React.createElement("input", { type: "checkbox", checked: selected === "done", onChange: this.changed.bind(this, "done") }),
						"已完成"
					),
					React.createElement(
						"label",
						{ className: "chosen-label" },
						React.createElement("input", { type: "checkbox", checked: selected === "no-done", onChange: this.changed.bind(this, "no-done") }),
						"未完成"
					),
					React.createElement(
						"label",
						{ className: "chosen-label" },
						React.createElement("input", { type: "checkbox", checked: selected === "", onChange: this.changed.bind(this, "") }),
						"所有"
					)
				),
				React.createElement(
					"div",
					{ className: "footer-right" },
					React.createElement(
						"button",
						{ onClick: this.props.clearCompleted, className: "del-btn-big" },
						"删除已完成的"
					)
				)
			);
		}
	});

	module.exports = Footer;

/***/ }
/******/ ]);