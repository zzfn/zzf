import Link from 'next/link'
import LottiePlayer from "../components/LottiePlayer";
import { getCdn } from "../utils/getCdn";

export default function NotFound() {
  return (
      <div className='flex justify-center items-center'>
        <LottiePlayer size={500} url={getCdn('/assets/404.json')} />
      </div>
  )
}
