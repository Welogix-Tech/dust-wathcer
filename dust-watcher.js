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

var gaze = require('gaze');
var fs = require("fs");
var dust = require("dustjs-linkedin");
var async = require("async");
var path = require("path");


var dustWatcher = {
    loadHelper:function(helper){
        helper(dust);
    },
    /**
     * options like ：
     var watcherOption = [
     {input: "dust/*", output: "result"},
     {input: "dust1/*", output: "result1"}
     ];
     * @param options
     */
    watch: function (options,callback) {
        //获取绝对输入输出路径
        options.forEach(function(option,i){
            option.input=path.join(process.cwd(),option.input);
            option.output=path.join(process.cwd(),option.output);
        });

        async.each(options, function (option, eachCallBack) {
            /**
             * gaza监听规则：
             * dust/* :监听dust目录下所有操作-文件添加，删除，修改，重命名
             * dust/*.text:只监听已存在的后缀为.text文件的添加，删除，修改，重命名
             */
            gaze(option.input, function (err, watcher) {
                // Files have all started watching
                // watcher === this
                // Get all watched files
                //console.log(this.watched());
                //console.log("开始监听..");
                // On file changed
                this.on('changed', function (filepath) {
                    console.log(filepath + ' is modified');
                    fs.readFile(filepath, "utf-8", function (err, data) {
                        if (!err) {
                            var fileName=path.basename(filepath,".dust");
                            parseDustFile(option, data, fileName);
                        } else {
                            console.log("read error：" + filepath);
                        }
                    });
                });

                // On file added
                this.on('added', function (filepath) {
                    console.log(filepath + ' was added');
                });

                // On file deleted
                this.on('deleted', function (filepath) {
                    console.log(filepath + ' was deleted');
                });

                // On changed/added/deleted
                this.on('all', function (event, filepath) {
                    //console.log(filepath + ' was ' + event);
                });
                // Get watched files with relative paths
                for(var dir in this.relative()){
                    console.log("start to watch ["+dir+"]");
                    if(this.relative()[dir].length===0){
                        console.log("the dir spell wrong or the dir is empty");
                    }
                }
                //console.log(this.relative());
            });
            eachCallBack(null);
        }, function (err) {
            // if any of the saves produced an error, err would equal that error
            if (err) {
                // One of the iterations produced an error.
                // All processing will now stop.
                //console.log('A file failed to process');
                callback(false);
            } else {
                //console.log('All files have been processed successfully');
                callback(true);
            }
        });
    }

};

/**
 * 1.编译文件
 * 2.覆盖文件到目标目录
 * @param data
 * @param name
 */
var parseDustFile = function (option, data, name) {
    //dust编译模板，参数：模板名称

    var template = dust.compile(data, name);
    if (option.output) {
        //判断输出目录是否存在
        fs.exists(option.output, function (exists) {
            if (!exists) {
                fs.mkdir(option.output);
            }
            //w:如果文件不存在则会被创建
            var fd = fs.openSync(path.join(option.output,name+".js"),"w");
            fs.writeSync(fd, template, 0, "utf8");
        });
    } else {
        console.log(template);
    }
};



module.exports = dustWatcher;

