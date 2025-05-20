import { useState, useEffect, useRef } from 'react';
import { LoadingIcon, FerrisIcon } from '../assets/svgs';

export default function PageLoading() {
  const [ferrisVisible, setFerrisVisible] = useState([false, false, false]);
  const animationTimeout = useRef<number | null>(null);
  const animationDelay = 500;

  useEffect(() => {
    const animateSequence = (step: number) => {
      if (!animationTimeout.current) return;

      setFerrisVisible((prev) => {
        const next = [...prev];
        if (step >= 1 && step <= 3) {
          next[step - 1] = true;
        } else if (step === 4) {
          return [false, false, false];
        }
        return next;
      });

      const nextStep = step + 1;
      if (nextStep <= 4) {
        animationTimeout.current = setTimeout(() => animateSequence(nextStep), animationDelay);
      } else {
        animationTimeout.current = setTimeout(() => animateSequence(1), animationDelay * 2);
      }
    };

    animationTimeout.current = setTimeout(() => animateSequence(1), animationDelay);

    return () => {
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, [animationDelay, setFerrisVisible]);

  return (
    <>
      <div className=" w-full h-[100dvh] bg-[var(--theme-0)] text-[var(--theme-00)] flex justify-center items-center">
        <span className="text-3xl font-extrabold">
          Ferrouding
        </span>
        <div className="flex w-64  items-center">
          {ferrisVisible[0] && <FerrisIcon width="24px" height="24px" opacity={ferrisVisible[1] ? "0" :'1'} />}
          {ferrisVisible[1] && <FerrisIcon width="44px" height="44px" opacity={ferrisVisible[2] ? "0" : '1'} />}
          {ferrisVisible[2] && <FerrisIcon width="64px" height="64px" />}
          <div className="progress w-20 h-20 flex justify-center items-center">
            <LoadingIcon width="64px" height="64px" fill="#572c1bfb" />
          </div>
        </div>
      </div>
    </>
  );
}
