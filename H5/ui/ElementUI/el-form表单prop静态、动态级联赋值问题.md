# el-form表单prop静态、动态级联赋值问题


## 说明
使用表单时可能会出现用v-for来循环展示表单项，此时表单项prop属性就需要动态指定
ps: prop属性值应该是表单绑定的对象名，如form中的structureId

### vue代码

```vue
<template>
  <div>

    <el-form ref='forms' :model='form' :rules='rules' label-width='140px' :inline="true">

      <!--
      静态级联形式
              此时需要注意：在表单项的prop中，书写形式为  prop="xxx.xx" 
      -->

      <el-form-item label="能耗单元" prop="structure.name">
        <el-input v-model="form.structure.name"></el-input>
      </el-form-item>


      <!--
     动态v-for赋值形式
            此时需要注意：在表单项的prop中，书写形式为  :prop="``" 

            若是数组形式，则使用 .${索引值} 来表示数组的 obj[n] ,其中 .  为连接符
     
     -->
      <el-form-item :label="item.name"
                    ref="inputRef"
                    v-if="item.textType == '01'"
                    :prop="`values.${paramNameList.indexOf(item.name)}.value`">
        <el-input v-model="form.values[paramNameList.indexOf(item.name)].value"
                  :placeholder="item.promptText + valueTypes[item.valueType]">
        </el-input>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  // 数据
  data() {
    return {
      form: {
        structureId: '',
        structure: {
          name: '',
        },
        indexLibParamList: [],
        radioCheckList: [],     //  单选框与多选框数组
        // 	指标单元动态属性对象数组；{value:属性值,name:属性名,arr:[]}
        values: [],
        rules: []
      },
    }
  },
}
</script>
```