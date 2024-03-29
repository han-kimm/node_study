const { isLoggedIn, isNotLoggedIn } = require('./')

describe('isLoggedIn', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn()
  };
  const next = jest.fn()
  test('로그인 o, next 호출', () => {
    const req = {
      isAuthenticated: jest.fn(() => true)
    };
    isLoggedIn(req, res, next)
    expect(next).toBeCalledTimes(1)
  })

  test('로그인 x, 에러 응답', () => {
    const req = {
      isAuthenticated: jest.fn(() => false)
    };
    isLoggedIn(req, res, next)
    expect(res.status).toBeCalledWith(403)
    expect(res.send).toBeCalledWith({ message: '로그인 필요' })
  })

})
describe('isNotLoggedIn', () => {
  // test('로그인 o, 에러 응답', () => {
  //   isNotLoggedIn()
  // })
})