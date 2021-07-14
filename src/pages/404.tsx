import LottiePlayer from 'components/LottiePlayer/LottiePlayer';

export default function Custom404(): JSX.Element {
  return (
    <div className={'flex justify-center items-center'}>
      <LottiePlayer size={300} url={'https://cdn.annyyy.com/blog/64166-error-404.json'} />
    </div>
  );
}
