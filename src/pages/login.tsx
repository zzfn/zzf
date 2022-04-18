import { Button, Input } from '@zzf/design';
import { login, register } from 'api/user';
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
  const handleRegister = async () => {
    const { code, msg } = await register(loginInfo);
    if (code === 0) {
      alert('注册成功，请登录');
    } else {
      alert(msg);
    }
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
      <Button onClick={handleRegister}>注册</Button>
      <a href='//admin.zzfzzf.com'>后台系统可使用注册的账号登录</a>
    </div>
  );
};
export default Login;
