import { signInAction } from './actions';
function SignIn() {
  return (
    <form action={() => signInAction()}>
      <button type='submit'>GITHUB</button>
    </form>
  );
}

export default SignIn;
