// import Component from './component.js'
import Tab from './tab.js'
import Div from './Div.js'

function myCreate(Class, attributes, ...children) {
    // 对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
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
    {/* <Div tab-title="发现" style="background-color: purple;"></Div> */}
</Tab>
a.appendTo(document.body);