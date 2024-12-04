import LottiePlayer from '../components/LottiePlayer';
import { getCdn } from '../utils/getCdn';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center'>
      <LottiePlayer size={500} url={getCdn('/assets/404.json')} />
    </div>
  );
}
