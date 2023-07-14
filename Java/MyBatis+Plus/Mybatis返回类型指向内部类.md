在resultType中可以使用$符号指向内部类

--例如
```xml
<select  id='select' resultType='`com.test.BoardSummaryDataVo$BoardSummaryItemDataVo`'>
    SELECT * from test
</select>
```

