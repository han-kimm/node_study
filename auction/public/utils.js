const timeSetter = (server, end) => {
  if (server >= end) { // 경매가 종료되었으면
    return '00:00:00';
  } else {
    const t = end - server;
    const seconds = ('0' + Math.floor((t / 1000) % 60)).slice(-2);
    const minutes = ('0' + Math.floor((t / 1000 / 60) % 60)).slice(-2);
    const hours = ('0' + Math.floor((t / (1000 * 60 * 60)) % 24)).slice(-2);
    return hours + ':' + minutes + ':' + seconds;
  }
}

export default timeSetter