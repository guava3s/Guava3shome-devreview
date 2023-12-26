class Person {

    constructor(name, age, height) {
        this.name = name
        this.age = age
        this.height = height
    }

}

// 使用extends关键字后，父类的属性都会成为该对象的 自有属性
class Worker extends Person {
    constructor(ability) {
        super()
        this.ability = ability
    }
}

const worker = new Worker()

// Object.prototype.hasOwnProperty: 返回Boolean，判断目标属性是否为【自有】属性或【继承实例】属性（不包含【继承原型】属性）
function testHasOwnProperty() {
    console.log('worker = ', worker)
    console.log('worker.hasOwnProperty(\'height\') = ', worker.hasOwnProperty('height'))
}

// 检测该属性是否存在于 【对象上】或其 【原型链】上
function testIn() {
    console.log('\'height\' in demo = ', ('height' in worker))
}

// 效果与hasOwnProperty相同，建议使用此方法替代 Object.prototype.hasOwnProperty()，因为它适用于使用 Object.create(null) 创建的对象，以及重写了继承的 hasOwnProperty() 方法的对象。
// 尽管可以通过在外部对象上调用 Object.prototype.hasOwnProperty() 解决这些问题，但是 Object.hasOwn() 更加直观。
function testObjectHasOwn() {
    console.log('Object.hasOwn(worker, \'height\')', Object.hasOwn(worker, 'height'))
}

testHasOwnProperty()
testIn()
testObjectHasOwn()


// 总结：
// 判断是否为自有属性:                   xxx.hasOwnProperty(prop)
// 判断是否为自有属性or原型链属性:        prop in xxx   Object.hasOwn(xxx, prop')