import { useState, useEffect } from 'react'
import { ArrowRightIcon } from '../assets/svgs'
import { Link } from '@tanstack/react-router'
import type { TMenu } from '../types/menu'
import { useStore } from '../state_warehouse/index'

type classOrder = {
  key: string;
  classroomId: string;
  to: string;
}

export default function ButtonChangePage({ classroomId }: { classroomId: string }) {
  const dataMenu = useStore((state) => state.dataMenu)
  const [isShow, setShow] = useState(false);
  const [btnOption, setBtnOptions] = useState<{ menu: classOrder[], index: number }>();
  const TRANSITION = "transition-all ease-in-out duration-500 active:bg-theme-3 shadow-md shadow-theme-o-4-d hover:outline-2 hover:outline-theme-3 disabled:shadow-none disabled:bg-gray-400 disabled:outline-0 disabled:outline-gray-400 ";

  useEffect(() => {
    if (isShow) {
      const timer = setTimeout(() => {
        setShow(false)
      }, 4000)
      return () => clearTimeout(timer);
    }
  }, [isShow]);

  useEffect(() => {
    const menu = convertMenu(dataMenu);
    const index = menu.findIndex((obj) => obj.classroomId.classroomId === classroomId)
    setBtnOptions({ menu, index });
  }, [classroomId]);

  function getOptionRight(index: number) {
    return btnOption?.menu[btnOption?.index + 1]
  }
  function getOptionLeft(index: number) {
    return btnOption?.menu[btnOption?.index - 1]
  }

  function convertMenu(menuItems: TMenu[]): classOrder[] {
    const routes: classOrder[] = [];

    function processItem(item: MenuItem) {
      if (item?.params?.classroomId) {
        routes.push({ key: item.key, classroomId: item.params, to: item.to });
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
  }

  return (
    <div className="fixed left-0 w-full top-1/2 flex items-center justify-between px-3">
      <button disabled={!getOptionLeft()} className={`absolute ${TRANSITION} ${!isShow ? "-left-24" : "left-2"}`}>
        <Link
          to={getOptionLeft()?.to}
          params={getOptionLeft()?.classroomId}
          disabled={!getOptionLeft()}
        >
          <ArrowRightIcon className="transform rotate-180" />
        </Link>
      </button>
      <button disabled={!getOptionRight()} className={`absolute ${TRANSITION} ${!isShow ? "-right-24" : 'right-2'}`}>
        <Link
          to={getOptionRight()?.to}
          params={getOptionRight()?.classroomId}
          disabled={!getOptionRight()}
        >
          <ArrowRightIcon />
        </Link>
      </button>
      <button onClick={() => setShow(true)} className={`absolute rounded-full h-12 w-12 bg-translucent border-none ${TRANSITION} -right-0 ${isShow && 'opacity-0 hidden'} `}></button>
    </div>
  )
}