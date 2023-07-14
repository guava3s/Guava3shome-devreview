```java
@Component
public class Test {
    // 有泛型：
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private RedisTemplate redisTemplate2;

    public void test() {
        redisTemplate.opsForValue().set("name", "java");
        // 在redis中存储为：key=name,value=java

        redisTemplate2.opsForValue().set("age", "12");
        // 在redis中存储为：key=age,value="12"

        // 无泛型会多增加一个双引号，表示为字符串类型，之后使用需要进行类型转换；
        // 开发中建议使用一致的redisTemplate，强力推荐使用有泛型的redisTemplate
    }
}
```