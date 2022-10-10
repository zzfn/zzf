import LottiePlayer from 'components/LottiePlayer/LottiePlayer';
import { getCdn } from "../utils/getCdn";

export default function Custom404(): JSX.Element {
  return (
    <div className='flex justify-center items-center'>
      <LottiePlayer size={300} url={getCdn('/assets/404.json')} />
    </div>
  );
}
