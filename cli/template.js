#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const type = process.argv[2];
const name = process.argv[3]
const directory = process.argv[4] || '.'

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
const routerTemplate = `
const express = require('express');
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

const program = () => {
  if (!type || !name) {
    console.error('사용 방법: cli html|express-router 파일명 생성경로')
  } else {
    makeTemplate(type)
  }
}
program();