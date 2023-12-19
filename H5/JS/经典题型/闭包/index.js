function testSetTimeout() {
    function case1() {
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
    }

    function case2() {
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
    }

    function case3() {
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
    }
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------


/*
    <p id="help">Helpful notes will appear here</p>
    <p>E-mail: <input type="text" id="email" name="email" /></p>
    <p>Name: <input type="text" id="name" name="name" /></p>
    <p>Age: <input type="text" id="age" name="age" /></p>
 */
function test2() {
    function showHelp(help) {
        document.getElementById("help").innerHTML = help;
    }

    function setupHelp() {
        var helpText = [
            {id: "email", help: "Your e-mail address"},
            {id: "name", help: "Your full name"},
            {id: "age", help: "Your age (you must be over 16)"},
        ];

        for (var i = 0; i < helpText.length; i++) {
            var item = helpText[i];
            document.getElementById(item.id).onfocus = function () {
                showHelp(item.help);
            };
        }
        // 相当于(如下)，此时当input获取焦点时，就会获取最新被更改的item值，即：相当于是 给予一个引用，而后在动态的使用该引用
        /*
            var item;
            for (var i = 0; i < helpText.length; i++) {
                item = helpText[i];
            }
            document.getElementById('email').onfocus = function () {
                showHelp(item.help);
            };
            document.getElementById('name').onfocus = function () {
                showHelp(item.help);
            };
            document.getElementById('age').onfocus = function () {
                showHelp(item.help);
            };
         */

    }

    setupHelp();
}
