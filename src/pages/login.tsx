import { Button, Input } from '@zzf/design';
import { login } from 'api/user';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });
  const router = useRouter();
  const handleLogin = async () => {
    const { data } = await login(loginInfo);
    localStorage.setItem('uid', data.token);
    router.back();
  };
  return (
    <div>
      <h1>Login</h1>
      <div>
        账号：
        <Input
          onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
          value={loginInfo.username}
          type='text'
        />
      </div>
      <div>
        密码：
        <Input
          onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
          value={loginInfo.password}
          type='text'
        />
      </div>
      <Button onClick={handleLogin}>登录</Button>
    </div>
  );
};
export default Login;
