#dust-watcher.js

监听dust模板，并自动编译


## installation

```
npm install dust-watcher
```
## configuration

注意：配置相对路径时，必须根据调用dust-watcher所执行的app所在的路径

```
var watcherOption = [
    {input: "dust/*", output: "result"},
    {input: "dust1/*", output: "result1"}
];
module.exports = watcherOption;
```

## usage

```
dustWatcher.watch(option, function (succ) {
    console.log(succ);
});
```


## Release History

+ 0.0.3 使用path处理路径相关功能
+ 0.0.4 完善path处理

