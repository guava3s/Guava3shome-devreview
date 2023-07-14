# a-tooltip自定义样式

### vue代码

```vue

<template>
  <a-tooltip
      :title="promptSort"
      placement="topLeft"
      :overlayClassName="'toolTipOverlayClass'"><!--使用overlayClassName属性-->
    <a-icon :offset="[15, -2]" type="question-circle" style="font-size: 12px;color: rgba(0, 0, 0, 0.35)"/>
  </a-tooltip>
</template>

<script>
export default {
  data() {
    return {
      promptSort: 'hello, world'
    }
  }
}
</script>

<style lang="less">
.toolTipOverlayClass {
  .ant-tooltip-inner {
    width: 300px;
    min-height: 32px;
    color: #000000d9;
    text-align: left;
    text-decoration: none;
    background-color: rgb(249 249 249);
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .ant-tooltip-arrow {
    left: 10px;
  }
}
</style>
```

### html

```html
<!--还原成html-->
<div class="ant-tooltip toolTipOverlayClass ant-tooltip-placement-topLeft"
     style="left: 1315px; top: 380px; transform-origin: 0px 129px;">
    <div class="ant-tooltip-content">
        <div class="ant-tooltip-arrow"></div>
        <div role="tooltip" class="ant-tooltip-inner">hello, world</div>
    </div>
</div>
```

## 说明
* 使用a-tooltip中的overlayClassName属性，自定义样式，效果如上；
* 其中需要注意:
  * 自定义的样式不能包裹在scope内，即<style scope></style>
  * 自定义的样式级别与ant-tooltip同级
  * 在ant-tooltip中会有自定义的style样式，优先级最高，若是要覆盖其样式可以使用!important，但是非常不建议这么做！！！！
