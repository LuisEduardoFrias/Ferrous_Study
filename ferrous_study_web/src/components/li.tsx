import { useState, ChangeEvent, MutableRefObject, memo, useMemo } from 'react';
import { EditIcon, DeleteIcon, AddIcon, ArrowRightIcon, LinkIcon } from '../assets/svgs';
import type { TMenu } from '../types/menu';
import type { TClass } from '../types/class';
import ButtonIcon from '../components/button_icon';
import Select from './select'
import Ul from './ul'

export type LiProps = {
  value: TMenu;
  classArray: TClass[];
  onRemove: (key: string) => void;
  onAdd: (keys: string[]) => void;
  isEditable: string;
  onEditable: (value: string) => void;
  onChange: (key: string, event: ChangeEvent<HTMLInputElement>) => void;
  onChangeLink: (key: string, value: string) => void;
  inputRefs: MutableRefObject<{ [key: string]: HTMLInputElement | null }>;
  fatherKey?: string[];
};

const Li = memo(function Li({ value, onRemove, onAdd, classArray, onChangeLink, isEditable, onEditable, inputRefs, onChange, fatherKey }: LiProps) {
  const [isOpen, setIsOpen] = useState(false);

  const keys = useMemo(() => fatherKey ? [...fatherKey, value.key] : [value.key], [fatherKey, value.key]);

  const depth = () => {
    try {
      return value?.key?.split('-').length
    } catch (error) {
      console.log('value: ', value)

      console.log(error)
      alert('error en el console')
      return 3;
    }
  };

  return (
    <>
      <li className="flex flex-col gap-2">
        <div className="flex justify-between items-end h-10 border-b-2 border-theme-2">
          <div className="flex h-full  items-center gap-3 ">
            <input
              ref={(el) => (inputRefs.current[value.key] = el)}
              type="text"
              autoComplete="off"
              onBlur={() => onEditable('')}
              disabled={!(value.key === isEditable)}
              className="bg-transparent outline-2 outline-theme-3 pl-1 rounded-none h-full"
              value={value.text}
              placeholder="Opción del menú"
              onChange={(event) => onChange(value.key, event)}
            />
            {(!(value.subMenu) || value.subMenu?.length === 0) &&
              <>
                <LinkIcon />
                <Select options={classArray}
                  defaultValue={value?.params?.classroomId}
                  onChange={(linkValuw: string) => onChangeLink(value.key, linkValuw)} />
              </>
            }

            {(value.subMenu && value.subMenu.length > 0) &&
              <ButtonIcon>
                <ArrowRightIcon className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} onClick={() => setIsOpen(!isOpen)} />
              </ButtonIcon>
            }
          </div>
          <div className="flex w-32 h-full p-3 items-center gap-3 ">
            <ButtonIcon>
              <EditIcon onClick={() => onEditable(value.key)} />
            </ButtonIcon>
            {depth() < 3 && (
              <ButtonIcon>
                <AddIcon onClick={() => onAdd(keys)} />
              </ButtonIcon>
            )}
            {(!(value.subMenu) || value.subMenu?.length === 0) &&
              <ButtonIcon>
                <DeleteIcon onClick={() => onRemove(value.key)} />
              </ButtonIcon>
            }
          </div>
        </div>

        <div className={`pl-3 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`} >
          <Ul
            content={value.subMenu}
            onChange={onChange}
            onRemove={onRemove}
            classArray={classArray}
            onChangeLink={onChangeLink}
            fatherKey={keys}
            onAdd={onAdd}
            isEditable={isEditable}
            onEditable={onEditable}
            inputRefs={inputRefs}
          />
        </div>
      </li>
      {value?.key?.split('-').length === 1 && <div className="h-8"></div>}
    </>
  )
});

export default Li;