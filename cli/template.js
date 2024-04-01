#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

let rl;
let type = process.argv[2];
let name = process.argv[3]
let directory = process.argv[4] || '.'

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  
</body>
</html>
`
const routerTemplate = `const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;
`;

const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK)
  } catch (e) {
    return false;
  }
}

const mkdirp = (dir) => { // 경로 생성 함수
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = (type) => {
  mkdirp(directory)
  if (type === 'html') {
    const pathOfFile = path.join(directory, `${name}.html`)
    if (exist(pathOfFile)) {
      console.error('해당 html 파일이 이미 존재합니다.')
    } else {
      fs.writeFileSync(pathOfFile, htmlTemplate);
      console.log(pathOfFile, 'html 생성 완료')
    }
  } else if (type === 'express-router') {
    const pathOfFile = path.join(directory, `${name}.js`)
    if (exist(pathOfFile)) {
      console.error('해당 js 파일이 이미 존재합니다.')
    } else {
      fs.writeFileSync(pathOfFile, routerTemplate);
      console.log(pathOfFile, 'js 생성 완료')
    }
  } else {
    console.error('타입은 html 또는 express-router 여야합니다.')
  }
}

const dirAnswer = (answer) => {
  directory = answer ? answer.trim() : '.';
  rl.close()
  makeTemplate(type)
}

const nameAnswer = (answer) => { // 파일명 설정
  if (!answer || !answer.trim()) {
    console.clear();
    console.log('name을 반드시 입력하셔야 합니다.');
    return rl.question('파일명을 설정하세요. ', nameAnswer);
  }
  name = answer;
  return rl.question('저장할 경로를 설정하세요.(설정하지 않으면 현재경로) ', dirAnswer);
};

const typeAnswer = (answer) => { // 템플릿 종류 설정
  if (answer !== 'html' && answer !== 'express-router') {
    console.clear();
    console.log('html 또는 express-router만 지원합니다.');
    return rl.question('어떤 템플릿이 필요하십니까? ', typeAnswer);
  }
  type = answer;
  return rl.question('파일명을 설정하세요. ', nameAnswer);
};

const program = () => {
  if (!type || !name) {
    console.error('축약어로 생성하기: cli html|express-router 파일명 생성경로')
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    console.clear()
    rl.question('어떤 템플릿이 필요하십니까?', typeAnswer)
  } else {
    makeTemplate(type)
  }
}
program();