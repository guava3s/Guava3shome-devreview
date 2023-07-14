MyBatis中直接使用大于号、小于号会被当做XML符号解析，导致SQL执行错误，所以需要使用 转义形式或 标记形式写这两个符号
&gt; 表示大于号 ，greater than
&lt; 表示小于号", less than

--例如
```xml
<selct id="sss">
    SELECT * FROM cop_meter_read_day  
    WHERE ymd >= to_date(#{date}, 'YYYY-MM')
    AND ymd &lt; to_date(#{date}, 'YYYY-MM-DD')  
    AND meter_id = #{meterId}"
</selct>
```
