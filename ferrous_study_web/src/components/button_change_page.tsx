import { useState, useEffect } from 'react'
import { ArrowRightIcon } from '../assets/svgs'

export default function ButtonChangePage() {
  const [isShow, setShow] = useState(false);
  const TRANSITION = "transition-all ease-in-out duration-500 active:bg-theme-3 shadow-md shadow-theme-o-4-d hover:outline-2 hover:outline-theme-3";

  useEffect(() => {
    if (isShow) {
      const timer = setTimeout(() => {
        setShow(false)
      }, 4000)
      return () => clearTimeout(timer);
    }
  }, [isShow]);

  return (
    <div className="fixed left-0 w-full top-1/2 flex items-center justify-between px-3">
      <button className={`absolute ${TRANSITION} ${!isShow ? "-left-24" : 'left-2'}`}>
        <ArrowRightIcon className="transform rotate-180" />
      </button>
      <button className={`absolute ${TRANSITION} ${!isShow ? "-right-24" : "right-2"}`}>
        <ArrowRightIcon />
      </button>
      <button onClick={() => setShow(true)} className={`absolute rounded-full h-12 w-12 bg-translucent border-none ${TRANSITION} -right-0 ${isShow &&
        'opacity-0 hidden'} `}></button>
    </div>
  )
}