# el-form表单组件校验问题

## 说明

* 在表单校验中尽量 多使用rules校验规则，优先在data(){}中添加rules校验规则，也可以直接在标签中引用 :rules=""，
* 在遇到相对复杂的校验时才考虑自定义规则校验器，且在自定义校验规则结尾需加上callback()回调 ，否则提交时无法通过

* 四种校验形式：
  1、使用普通默认引用rules,即在<el-form>标签中填写rules属性，在data(){}中填写对应变量即可
  2、使用行内形式，直接在表单项<el-form-item>中添加:rules={}/[]
  3、使用自定义校验规则
  4、使用计算属性与匿名函数来进行高级复杂校验

### vue代码

```vue

<template>
  <div>
    <el-form ref='forms' :model='form' :rules='rules' label-width='100px' :inline="true">

      <!--使用普通默认引用rules-->
      <el-form-item label="倍率:" prop="param.multipier">
        <el-input v-model="form.param.multipier" placeholder="请输入倍率"></el-input>
      </el-form-item>

      <!--使用表单项引用rules
        需要注意；  :rules的值中无法从方法中返回，但可以从data(){}中指定对象
        -->
      <el-form-item label="用电单元:" prop="unitId"
                    :rules="{required: true, message: '请选择用电单元', trigger: 'blur'}">
        <el-cascader v-model="form.unitId"
                     :options="this.structureDataImpl"
                     placeholder="请选择父级组织"
                     class="meterField"
                     :props="prop"
                     :show-all-levels="false"
                     clearable filterable>
        </el-cascader>
      </el-form-item>

      <!--自定义规则校验-->
      <el-form-item label="初期读数:" prop="initReadValue">
        <el-input v-model.trim="form.initReadValue" placeholder="请输入初期读数"></el-input>
      </el-form-item>


      <!--
              高级自定义校验规则:计算属性与匿名函数
        适用于需要对数据进行二次加工处理的校验
          -->
      <el-form-item label="枚举值"
                    :key="item.key"
                    :rules="enumsNameRule(item)"
                    :prop="`dynamicEnums.${form.dynamicEnums.indexOf(item)}.label`">
        <el-input v-model="item.label" placeholder="请输入选项名"
                  style="width: 200px"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  computed: {
    enumsNameRule() {
      return (item) => {
        let enumsNameValidator = (rule, value, callback) => {
          if (value) {
            let filter = this.form.dynamicEnums.filter(obj => obj.label === item.label);
            if (filter.length > 1) {
              callback(new Error('已存在该枚举名'))
            }
          }
          callback()
        };
        // 注意返回是一个数组或者对象
        return [
          {required: true, message: '请输入枚举名', trigger: 'blur'},
          {required: true, message: '枚举名长度不超过20', min: 0, max: 20, trigger: 'blur'},
          {required: true, validator: enumsNameValidator}
        ]
      }
    },
  },

  data() {
    let initReadValueValidator = (rule, value, callback) => {
      if (value.length > 10) {
        callback(new Error('初期读数不超过10个字符'));
      } else {
        callback();
      }
    };
    return {
      form: {},
      rules: {
        param: {
          initReadValue: [
            {required: true, message: '请输入初期读数', trigger: 'blur'},
            {validator: initReadValueValidator, trigger: 'blur'}
          ],
          multipier: [
            {required: true, message: '请输入倍率', trigger: 'blur'},
            {type: 'string', pattern: /^\d{1,5}$/, message: '倍率为纯数字且不超过5个字符', trigger: 'blur'},
          ],
        }
      }
    }
  }
}
</script>
```