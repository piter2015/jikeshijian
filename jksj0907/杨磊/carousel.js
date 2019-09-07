class Carousel {
    // 一个轮播在构造方法中 应该传入的是配置
    // TODO:那么container算配置么?
    constructor(element, config) {
        element.style.width = config[WIDTH_SYMBOL] + "px";
        element.style.height = config[HEIGHT_SYMBOL] + "px";
        element.style.whiteSpace = "nowrap";

        for (let d of config[DATA_SYMBOL]) {
            let img = document.createElement("img");
            img.style.width = "100%";
            img.style.height = "100%";
            // img.style.display = "inline-block";
            img.src = d;
            element.appendChild(img);

        }
    }
}


const WIDTH_SYMBOL = Symbol("width");
const HEIGHT_SYMBOL = Symbol("height");
const DATA_SYMBOL = Symbol("data");

class Config {
    constructor(width, height, data) {
        this[WIDTH_SYMBOL] = width;
        this[HEIGHT_SYMBOL] = height;
        this[DATA_SYMBOL] = data;
    }
}

let data = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];
let config = new Config(500, 300, data);
container = document.getElementById("container");
let carsousel = new Carousel(container, config);