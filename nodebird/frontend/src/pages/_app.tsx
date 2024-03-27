import { useCallback, useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import UserInfo from "../components/UserInfo";
import "./_app.css";

function App() {
  const [user, setUser] = useState<{
    id: string;
    nick: string;
  }>();

  const fetchUser = useCallback(() => fetch("http://localhost:8001/api/user").then((res) => res.json()), []);

  useEffect(() => {
    (async () => {
      const res = await Promise.allSettled([fetchUser()]);
      if (res[0].status === "fulfilled") {
        setUser(res[0].value);
      }
    })();
  }, [user?.id]);

  return (
    <div className="container">
      <div className="profile-wrap">{user?.id ? <UserInfo user={user} /> : <LoginForm />}</div>
    </div>
  );
}

export default App;
