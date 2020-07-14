var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _react=_interopRequireDefault(require("react"));var _extractTransform=_interopRequireDefault(require("../lib/extract/extractTransform"));var _extractProps=require("../lib/extract/extractProps");var _units=_interopRequireDefault(require("../lib/units"));var _Shape2=_interopRequireDefault(require("./Shape"));var _NativeComponents=require("./NativeComponents");var _jsxFileName="/Users/msand/WebstormProjects/react-native-svg/src/elements/Mask.tsx";var Mask=function(_Shape){(0,_inherits2.default)(Mask,_Shape);function Mask(){(0,_classCallCheck2.default)(this,Mask);return(0,_possibleConstructorReturn2.default)(this,(0,_getPrototypeOf2.default)(Mask).apply(this,arguments));}(0,_createClass2.default)(Mask,[{key:"render",value:function render(){var props=this.props;var maskTransform=props.maskTransform,transform=props.transform,x=props.x,y=props.y,width=props.width,height=props.height,maskUnits=props.maskUnits,maskContentUnits=props.maskContentUnits,children=props.children;return _react.default.createElement(_NativeComponents.RNSVGMask,(0,_extends2.default)({ref:this.refMethod},(0,_extractProps.withoutXY)(this,props),{x:x,y:y,width:width,height:height,maskTransform:(0,_extractTransform.default)(maskTransform||transform||props),maskUnits:maskUnits!==undefined?_units.default[maskUnits]:0,maskContentUnits:maskContentUnits!==undefined?_units.default[maskContentUnits]:1,__source:{fileName:_jsxFileName,lineNumber:42}}),children);}}]);return Mask;}(_Shape2.default);exports.default=Mask;(0,_defineProperty2.default)(Mask,"displayName",'Mask');(0,_defineProperty2.default)(Mask,"defaultProps",{x:'0%',y:'0%',width:'100%',height:'100%'});
//# sourceMappingURL=Mask.js.map