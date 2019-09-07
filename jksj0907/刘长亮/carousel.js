
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state') 

class CarouselView {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null); 
        this[ATTRIBUTE_SYMBOL] = Object.create(null); //如果要设计toString，这样不会去找原型链
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.config = config;
        this.didCreated();
    }

    appendTo(element) {
        element.appendChild(this.root)
    }

    //lifeCycle
    didCreated() {
        let {width, height, children} = this.config;
        this.root = document.createElement('div');
        this.width = width
        this.height = height;
        this.children = children;
        this.startX  = 0;
        this.position = 0;
        enableGesture(this.root)
        this.root.style.overflow = 'hidden';
        this.root.style.whiteSpace = 'nowrap';
        this.root.style.outline = 'solid 1px blue';


        let panmove = (event) => {
            if (event.isVertical) 
                return;
            event.preventDefault();//阻止默认的拖拽效果
            for (let child of this.children) {
                child.style.transition = "ease 0s";
                child.style.transform = `translateX(${this.startX + event.dx}px)`; //复位
            }
        }
    
        let panend = (event) => {
            if (event.isVertical) 
                return;
                
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                if (event.dx > 0) {
                    this.position = this.position - 1;
                } 
                if (event.dx < 0) {
                    this.position = this.position + 1;
                }
            } else {
                this.position = - Math.round((this.startX + event.dx) / 500);  // 取最近的整数
            }
    
            this.position = Math.max(0, Math.min(this.position, this.children.length - 1));//如果position 不取正值
    
            for (let child of this.children) {
                child.style.transition = "";
                child.style.transform = `translate(${-this.position * 500}px)`; //复位
            }
    
            this.startX  = -this.position * 500;
        }

        this.root.addEventListener('panmove', panmove);
        this.root.addEventListener('panend', panend);
        
    }

    // didMount() {

    // }

    // didUnmount() {

    // }

    // didUpdate() {

    // }

    // method
    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }

    // pause() {

    // }

    // resume() {

    // }

    // next() {

    // }

    // prev() {

    // }

    // width height children duration autoplay easing 

    // set attribute(type, value) {
    //     switch(type) {
    //         case 'width':
    //             this.width = value
    //             break;
    //         case 'height': 
    //             this.height = value
    //             break;
    //         case 'children': 
    //             this.children = value;
    //             break;
    //         case 'duration': 
    //             this.duration = value;
    //             break;
    //         case 'autoplay':
    //             this.autoplay = value;
    //             break;
    //         case 'easing':
    //             this.easing = value;
    //             break;
    //     }

    //     return this[ATTRIBUTE_SYMBOL][type] = value
    // }
    // get attribute(type) {
    //     return this[ATTRIBUTE_SYMBOL][type]
    // }   

    set width(value) {
        this[PROPERTY_SYMBOL].width = value
        this.root.style.width = value;
    }

    get width() {
        return this[PROPERTY_SYMBOL].width
    }

    set height(value) {
        this[PROPERTY_SYMBOL].height = value
        this.root.style.height = value;
    }

    get height() {
        return this[PROPERTY_SYMBOL].height
    }

    set children(value) {
        this[PROPERTY_SYMBOL].children = value
        if (value && value.length > 0) {
            for (let child of value) { 
                this.root.appendChild(child);
            }
        }
    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    set duration(value) {
        this[PROPERTY_SYMBOL].duration = value
    }

    get duration() {
        return this[PROPERTY_SYMBOL].duration;
    }

    set autoplay(value) {
        this[PROPERTY_SYMBOL].autoplay = value
    }

    get autoplay() {
        return this[PROPERTY_SYMBOL].autoplay;
    }

    set easing(value) {
        this[PROPERTY_SYMBOL].easing = value
    }

    get easing() {
        return this[PROPERTY_SYMBOL].easing;
    }

    set default(value) {
        this[PROPERTY_SYMBOL].default = value
    }

    get default() {
        return this[PROPERTY_SYMBOL].default
    }

    set startX(value) {
        this[PROPERTY_SYMBOL].startX = value
        // this.triggerEvent('panend');
    }

    get startX() {
        return this[PROPERTY_SYMBOL].startX;
    }

    set position(value) {
        this[PROPERTY_SYMBOL].position = value;
    }

    get position() {
        return this[PROPERTY_SYMBOL].position;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set;
        }
        this[EVENT_SYMBOL][type].add(listener)
    } 

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            throw new Error(`no such listener ${type}`)
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }
}


function enableGesture(main) {

    let start = (point, ctx) => {
        ctx.startX = point.clientX;
        ctx.startY = point.clientY;

        ctx.startTime = Date.now();
        // default setting
        ctx.isTap = true;
        ctx.isPan = false;

        ctx.isPress = false;
        ctx.pressHandler = setTimeout(() => {
            ctx.isPress = true;
            ctx.isTap = false;
            let e = new Event("pressstart");
            main.dispatchEvent(e);
            ctx.pressHandler = null;
        }, 500);
    }

    let move = (point, ctx) => {
        let dx = point.clientX - ctx.startX;
        let dy = point.clientY - ctx.startY;

        if (dx * dx + dy * dy > 100) {
            ctx.isTap = false;

            if (ctx.pressHandler !== null) {
                ctx.isPress = false;
                clearTimeout(ctx.pressHandler);
                ctx.pressHandler = null;
            } else if (ctx.isPress){
                ctx.isPress = false;
                let e = new Event("presscancel");
                main.dispatchEvent(e);
            }

            if (ctx.isPan == false) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    ctx.isHorizontal = true;
                    ctx.isVertical = false;
                } else {
                    ctx.isHorizontal = false;
                    ctx.isVertical = true;
                }

                let e = new Event("panstart");
                e.startX = ctx.startX;
                e.startY = ctx.startY;
                main.dispatchEvent(e);
                ctx.isPan = true;
            } 
        } 
        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - ctx.startTime);
        if (ctx.isPan && v > 0.3) {
            ctx.isFlick = true;
            let e = new Event("flick");
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        } else {
            ctx.isFlick = false;
        }

        // 适配逻辑 
        if (ctx.isPan) {
            let e = new Event("panmove");
            e.dx = dx;
            e.dy = dy;
            e.isFlick = ctx.isFlick;
            e.isHorizontal = ctx.isHorizontal;
            e.isVertical = ctx.isVertical;
            main.dispatchEvent(e);
        }
    }

    let end = (point, ctx) => {

        if (ctx.pressHandler !== null) {
            clearTimeout(ctx.pressHandler);
        }

        if (ctx.isPress) {
            let e = new Event("pressend");
            main.dispatchEvent(e);
        }

        if (ctx.isTap) {
            let e = new Event("tap");
            main.dispatchEvent(e);
        }
        let dx = point.clientX - ctx.startX;
        let dy = point.clientY - ctx.startY;
        if (ctx.isPan) {
            let e = new Event("panend");
            e.dx = dx;
            e.dy = dy;
            e.isHorizontal = ctx.isHorizontal;
            e.isVertical = ctx.isVertical;
            main.dispatchEvent(e);
        }
    }

    let cancel = (point, ctx) => {
        if (ctx.isPan) {
            let e = new Event("pancancel");
            main.dispatchEvent(e);
        }

        if (ctx.isPress) {
            let e = new Event("pressend");
            main.dispatchEvent(e);
        }

        if (ctx.pressHandler !== null) {
            let e = new Event("presscancel");
            main.dispatchEvent(e);
            clearTimeout(ctx.pressHandler);
        }
    }

    let contexts = Object.create(null);
    
    let mouseSymbol = Symbol("mouse");
    // mouse gesture
    let mousestart = (event) => {
        event.preventDefault();
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }

    let mousemove = (event) => {
        move(event, contexts[mouseSymbol]);
    }

    let mouseup = (event) => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        end(event, contexts[mouseSymbol]);
        delete contexts[mouseSymbol];
    }
    main.addEventListener('mousedown', mousestart);

    // touch gesture
    let touchstart = (event) => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    }

    let touchmove = (event) => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier]);
        }
    }

    let touchend = (event) => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }

    let touchcancel = (event) => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }

    main.addEventListener("touchstart", touchstart);
    main.addEventListener("touchstart", (event) => { event.preventDefault(), {passive: false}} );
    main.addEventListener("touchmove", touchmove);
    main.addEventListener('touchend', touchend);
    main.addEventListener('touchcancel', touchcancel);
}