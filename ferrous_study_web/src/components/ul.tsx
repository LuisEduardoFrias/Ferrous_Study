import { ChangeEvent, MutableRefObject, memo } from 'react'
import type { TMenu } from '../types/menu'
import type { TClass } from '../types/class'

import Li from './li'

export type UlProps = {
  content?: TMenu[];
  onRemove: (key: string) => void;
  onAdd: (keys: string[]) => void;
  isEditable: string;
  classArray: TClass[];
  onEditable: (value: string) => void;
  onChangeLink: (key: string, value: string) => void;
  onChange: (key: string, event: ChangeEvent<HTMLInputElement>) => void;
  inputRefs: MutableRefObject<{ [key: string]: HTMLInputElement | null }>;
  fatherKey?: string[];
};

const Ul = memo(function Ul({ content, onRemove, classArray, onAdd, isEditable, onChangeLink, onEditable, inputRefs, onChange, fatherKey }: UlProps) {
  return (
    <ul className=" flex flex-col">
      {
        content?.map((value: TMenu, index: number) => (
          <Li
            key={index}
            value={value}
            onChange={onChange}
            onRemove={onRemove}
            fatherKey={fatherKey}
            classArray={classArray}
            onChangeLink={onChangeLink}
            onAdd={onAdd}
            isEditable={isEditable}
            onEditable={onEditable}
            inputRefs={inputRefs}
          />
        ))
      }
    </ul>
  );
});

export default Ul;