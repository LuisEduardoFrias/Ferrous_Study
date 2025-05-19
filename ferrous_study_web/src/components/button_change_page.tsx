import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { ArrowRightIcon } from '../assets/svgs'
import { Link } from '@tanstack/react-router'
import type { TMenu } from '../types/menu'
import { useStore } from '../state_warehouse/index'

type classOrder = {
  key: string;
  params: { classroomId: string; }
  to: string;
}

function ButtonChangePage({ classroomId }: { classroomId: string }) {
  const dataMenu = useStore((state) => state.dataMenu)
  const [isShow, setShow] = useState(false);
  const [btnOption, setBtnOptions] = useState<{ menu: classOrder[], index: number }>();
  const TRANSITION = "transition-all ease-in-out duration-500 active:bg-theme-3 shadow-md shadow-theme-o-4-d hover:outline-2 hover:outline-theme-3 disabled:shadow-none disabled:bg-gray-400 disabled:outline-0 disabled:outline-gray-400 ";
  const timer = useRef<number | undefined>();
  const defaultParams = { classroomId: '' };

  useEffect(() => {
    if (isShow) {
      timer.current = setTimeout(() => {
        setShow(false)
      }, 4000)
      return () => clearTimeout(timer.current);
    }
  }, [isShow]);

  useEffect(() => {
    const menu = convertMenu(dataMenu);
    const index = menu.findIndex((obj) => obj.params.classroomId === classroomId)
    setBtnOptions({ menu, index });
  }, [classroomId, dataMenu]);

  function reTimer() {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setShow(false)
    }, 4000)
  }

  const getOptionRight = useCallback(() => {
    return btnOption?.menu[btnOption?.index + 1]
  }, [btnOption]);

  const getOptionLeft = useCallback(() => {
    return btnOption?.menu[btnOption?.index - 1]
  }, [btnOption]);

  const convertMenu = useCallback((menuItems: TMenu[]): classOrder[] => {
    const routes: classOrder[] = [];

    function processItem(item: TMenu) {
      if (item?.params?.classroomId) {
        routes.push({ key: item.key, params: item.params, to: item.to });
      }
      if (item?.subMenu) {
        for (const subItem of item.subMenu) {
          processItem(subItem);
        }
      }
    }

    for (const item of menuItems) {
      processItem(item);
    }

    return routes;
  }, [])

  return (
    <div className="fixed z-20 left-0 w-full top-1/2 flex items-center justify-between px-3">
      <button onClick={()=>reTimer()}  disabled={!getOptionLeft()} className={`absolute ${TRANSITION} ${!isShow ? "-left-24" : "left-2"}`}>
        <Link
          to={getOptionLeft()?.to ?? ''}
          params={getOptionLeft()?.params  ?? defaultParams}
          disabled={!getOptionLeft()}
        >
          <ArrowRightIcon className="transform rotate-180" />
        </Link>
      </button>
      <button onClick={()=>reTimer()} disabled={!getOptionRight()} className={`absolute ${TRANSITION} ${!isShow ? "-right-24" : 'right-2'}`}>
        <Link
          to={getOptionRight()?.to ?? ''}
          params={getOptionRight()?.params ?? defaultParams}
          disabled={!getOptionRight()}
        >
          <ArrowRightIcon />
        </Link>
      </button>
      <button onClick={() => setShow(true)} className={`absolute rounded-full h-12 w-12 bg-translucent border-none ${TRANSITION} -right-0 ${isShow && 'opacity-0 hidden'} `}></button>
    </div>
  )
}

export default memo(ButtonChangePage);
