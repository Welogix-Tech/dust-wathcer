/**
 * Copyright (c) 2012-2013 Qeemo Ltd. All Rights Reserved.
 */
/**
 * User: TechBirds
 * Date: 14-4-3
 * Time: 下午2:34
 * Version: 1.0
 * Description:
 */

/**
 * 注意：配置相对路径时，必须根据调用dust-watcher所执行的app所在的路径
 * @type {Array}
 */
var watcherOption = [
    {input: "dust/*", output: "result"},
    {input: "dust1/*", output: "result1"}
];

module.exports = watcherOption;