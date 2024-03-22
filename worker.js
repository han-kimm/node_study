const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')

if (isMainThread) {
  //메인스레드
  const threads = new Set()
  threads.add(new Worker(__filename, {
    workerData: { start: 1 }
  }))
  threads.add(new Worker(__filename, {
    workerData: { start: 2 }
  }))

  for (const worker of threads) {
    worker.on('message', (v) => console.log('워커로부터', v))

    worker.on('exit', () => {
      threads.delete(worker)
      if (!threads.size) {
        console.log('out of Work...')
      }
    })

    worker.postMessage('ping')
  }

  // const worker = new Worker(__filename)
  // worker.on('message', (v) => console.log('워커로부터', v))

  // worker.on('exit', () => console.log('out of Work...'))

  // worker.postMessage('ping')
} else {
  // 워커스레드
  console.log(new Date())

  const data = workerData;
  parentPort.postMessage(`${data.start + 100}번 워커`)

  // parentPort.on('message', (v) => {
  //   console.log('부모로부터', v)
  //   parentPort.postMessage('pong')
  //   parentPort.close()
  // })
}