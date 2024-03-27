interface Props {
  user: {
    id: string;
    nick: string;
  };
  followingCount: number;
  followerCount: number;
}

const UserInfo = ({ user, followingCount, followerCount }: Props) => {
  return (
    <>
      <div className="user-name">'안녕하세요! ' + {user.nick} + '님'</div>
      <div className="half">
        <div>팔로잉</div>
        <div className="count following-count">{followingCount}</div>
      </div>
      <div className="half">
        <div>팔로워</div>
        <div className="count follower-count">{followerCount}</div>
      </div>
      <input id="my-id" type="hidden" value={user.id} />
      <a id="my-profile" href="/profile" className="btn">
        내 프로필
      </a>
      <a id="logout" href="/auth/logout" className="btn">
        로그아웃
      </a>
    </>
  );
};
export default UserInfo;
