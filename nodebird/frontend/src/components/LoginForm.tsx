const LoginForm = () => {
  return (
    <form id="login-form" action="/auth/login" method="post">
      <div className="input-group">
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" name="email" required autoFocus />
      </div>
      <div className="input-group">
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" name="password" required />
      </div>
      <a id="join" href="/join" className="btn">
        회원가입
      </a>
      <button id="login" type="submit" className="btn">
        로그인
      </button>
      <a id="kakao" href="/auth/kakao" className="btn">
        카카오톡
      </a>
    </form>
  );
};

export default LoginForm;
