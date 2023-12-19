for (var i = 1; i <= 5; i++) {
    console.log('hello')
    setTimeout(function timer() {
        console.log(i)
    }, i * 1000)
}
/**
 * hello
 * hello
 * hello
 * hello
 * hello
 * 6
 * 6
 * 6
 * 6
 * 6
 */


// 优化1：使用let代替var
for (let i = 1; i <= 5; i++) {
    console.log('hello')
    setTimeout(function timer() {
        console.log(i)
    }, i * 1000)
}
/**
 * hello
 * hello
 * hello
 * hello
 * hello
 * 1
 * 2
 * 3
 * 4
 * 5
 */

// 优化2：
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(j) {
        console.log(j)
    }, i * 1000, i)
}
/**
 * 1
 * 2
 * 3
 * 4
 * 5
 */