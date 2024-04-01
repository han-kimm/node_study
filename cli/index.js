#!/usr/bin/env node

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('예제가 재밌습니까? ( y/n )', (answer) => {
  if (answer === 'y') {
    console.log('당연하지')
  } else if (answer === 'n') {
    console.log('분발하겠습니다.')
  } else {
    console.log('y 또는 n으로 입력해주세요.')
  }
  rl.close()
})

console.log('bibibin', process.argv)