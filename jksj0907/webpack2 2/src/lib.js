// import Component from './component.js'
import Tab from './tab.js'
import Div from './Div.js'

function myCreate(Class, attributes, ...children) {
    // https://react.docschina.org/docs/jsx-in-depth.html
    // 对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
//     前面以及说过了，JSX 是 React.createElement(component, props, …children) 提供的语法糖，component 的类型是：string/ReactClass type，我们具体看一下在什么情况下会用到 string 类型，什么情况下用到 ReactClass type 类型

// string 类型react会觉得他是一个原生dom节点
// ReactClass type 类型 自定义组件
{/* <MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
会编译为：

React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
) */}
    let object = new Class();
    // console.log(arguments);
    // const array = Array.from(attributes)
// 循环添加属性
    for(let name in attributes) {
        object.setAttribute(name, attributes[name]);
    }
// 循环添加子
    for (let child of children) {
        object.appendChild(child);
    }
    return object;
}

// let a = <Component width="100"></Component>
let a = <Tab style="height: 500px; width: 500px;">
    <Div tab-title="推荐" style="background-color: lightblue;"></Div>
    <Div tab-title="有趣的店" style="background-color: red;"></Div>
    <Div tab-title="品牌新店" style="background-color: yellow;"></Div>
   
</Tab>
a.appendTo(document.body);