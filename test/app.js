/**
 * Copyright (c) 2012-2013 Qeemo Ltd. All Rights Reserved.
 */
/**
 * User: TechBirds
 * Date: 14-4-3
 * Time: 下午12:29
 * Version: 1.0
 * Description:
 */

var dustWatcher = require("../dust-watcher");
var option = require("./config");

dustWatcher.watch(option, function (succ) {
    console.log(succ);
});

