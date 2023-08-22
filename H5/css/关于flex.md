# 弹性布局 flex

### 介绍
弹性盒子（Flexbox）布局是一种为一维布局而设计的布局方法。一维的意思是你希望内容是按行或者列来布局。你可以使用display: flex来将元素变为弹性布局。

### 使用:
display: flex;

### 弹性盒子的轴（axes）

#### 主轴
弹性布局内的元素会按行排列是因为默认的flex-direction值为row，row代表了文本的行文方向。由于我们工作的环境是英文（中文也是如此），一种自左向右的语言，行的开始位置就是在左边，因此我们的弹性项也是从左边开始的。
因此flex-direction的值被定义为弹性盒子的主轴（main axis）。

#### 交叉轴
交叉轴（cross axis）则是和主轴垂直的一条轴。如果你的flex-direction是row并且弹性项是按照行内方向排列的，那么交叉轴就是块级元素的排列方向。如果flex-direction是column那么弹性项就会以块级元素排列的方向排布，然后交叉轴就会变为row。
即交叉轴的值与flex-direction相反

### 方向和次序
弹性盒子模型让我们可以通过为flex-direction属性设置row-reverse或column-reverse值来改变主轴上弹性项的方向。

