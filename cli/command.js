#!/usr/bin/env node

const { program } = require('commander')

program
  .name('cli')
  .version('0.0.1', '-v, --version')

program
  .command('template <type>')
  .usage('<type> --filename [filename] --path [path]')
  .description('템플릿을 생성합니다.')
  .option('-f, --filename [filename]', '파일명을 입력하세요.', 'index')
  .option('-d, --directory [path]', '생성 경로를 입력하세요.', '.')
  .action((type, options) => {
    console.log(type, options)
  })

program
  .command('*', { hidden: true })
  .action(() => {
    console.log('잘못된 명령어입니다.')
    program.help()
  })

program.parse(process.argv)