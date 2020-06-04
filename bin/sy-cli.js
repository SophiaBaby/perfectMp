#!/usr/bin/env node
const program = require('commander')
const updateNotifier = require('update-notifier')
const pkg = require('./../package.json')
const shell = require('shelljs')
const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60
})

if (notifier.update) {
    console.log(`有可更新版本: ${notifier.update.latest},建议更新后使用`)
}

// 查看版本
program
    .version(pkg.version, '-v, --version')
// clone项目
program
    .command('clone')
    .description('执行  `sy-cli clone`   初始化项目')
    .action(option => {
        let config = {
            group: null,
            projects: null
        }
        if (!config.group) {
            let clone = require('./../src/clone')
            clone(config)
        }
    })

// ... 中间的一大堆command

program.parse(process.argv)