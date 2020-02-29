
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

class Carousel {
    constructor(config){

        /*
        * 构造中应该是property 构造后外部不可修改
        * 这个this[Symbol] 就是this.xxx 只不过xxx可以为变量
        * */

        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    // 这里用作创建DOM并
    created(){
        this.root = document.createElement("div");
        this.root.style.width = "300px";
        this.root.style.height = "300px";
        this[STATE_SYMBOL].h = 0;
        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 100%, 50%)`;
    }
    mounted(){
        this.root.addEventListener("click", () => {
            this[STATE_SYMBOL].h += 60;
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
        })
    }
    unmounted(){

    }
    update(){

    }


    log(){
        console.log("width:", this.width);
    }

    // getXXX 和 setXXX的 应该是attribute 对外可读可写
    get width(){
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value){
        return this[PROPERTY_SYMBOL].width = value;
    }
    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "width") {
            this.width = value;
            this.triggerEvent("widthchange");
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type){
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}