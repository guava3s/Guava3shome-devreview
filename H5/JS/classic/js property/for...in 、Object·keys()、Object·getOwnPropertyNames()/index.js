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

// 返回该对象【自有】【可枚举】属性 以及 原型链上的【可枚举】属性
function testForIn() {

    const worker = new Worker()
    for (const key in worker) {
        console.log(key)
    }

    /**
     * name
     * age
     * height
     * ability
     */
}

// 返回该对象【自有】【可枚举】属性
function testObjectKeys() {
    const worker = new Worker()
    console.log('Object.keys(worker) = ', Object.keys(worker))
}

// 返回该对象所有【自有】属性(包含【可枚举】【不可枚举】属性,不包括使用【symbol值】作为名称的属性)
function testObjectGetOwnPropertyNames() {
    const worker = new Worker()
    console.log('Object.getOwnPropertyNames(worker) = ', Object.getOwnPropertyNames(worker))
}

// 返回当前对象所有【自有】【symbol值】属性
function testObjectGetOwnPropertySymbols() {
    const worker = new Worker()
    console.log('Object.getOwnPropertyNames(worker) = ', Object.getOwnPropertyNames(worker))
}


testForIn()
testObjectKeys()
testObjectGetOwnPropertyNames()
testObjectGetOwnPropertySymbols()

// 总结：
// 获取自身可枚举属性:       Object.keys(xxx)   for...in
// 获取原型链可枚举属性:      for...in
// 获取自身所有属性:         Object.getOwnPropertyNames(xxx)
