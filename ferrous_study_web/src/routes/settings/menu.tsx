import { useState, useRef, useEffect, ChangeEvent, MutableRefObject } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { githubService } from '../../services/github_service';
import type { TMenu } from '../../types/menu';
import { EditIcon, DeleteIcon, SaveIcon, AddIcon, ArrowRightIcon, LinkIcon, LoadingIcon } from '../../assets/svgs';
import ButtonIcon from '../../components/button_icon';
import Json from '../../jsons/menu.json';

const classroomIdsArray = [
  "que_es_rust",
  "ventajas_de_rust",
  "ecosistema_rust",
  "cargo",
  "ejercicios_ejemplos_codigo",
  "variables",
  "valores",
  "aritmetica",
  "inferencia_tipos",
  "eje_fibonacci",
  "solu_fibonacci"
];


export const Route = createFileRoute('/settings/menu')({
  component: Menu,
});

function Menu() {
  const [content, setContent] = useState<TMenu[]>([]);
  const [optionHidden, setOptionHidden] = useState<TMenu[]>([]);
  const [editable, setEditable] = useState('');
  const [loading, setLoading] = useState(false);
  const divRef = useRef<HTMLDivElement>({});
  const inputRefs = useRef<HTMLInputElement>({});

  function splitClassroom(data) {
    const WithClassroom = data.filter(item => item.to && item.to.includes('classroom'));
    const WithOutClassroom = data.filter(item => !item.to || !item.to.includes('classroom'));
    return { WithClassroom, WithOutClassroom };
  }

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await githubService.getFileContent("menu", 'json');

        //const { WithClassroom, WithOutClassroom } = splitClassroom(Json);
        const { WithClassroom, WithOutClassroom } = splitClassroom(JSON.parse(result));
        setContent(WithClassroom)
        setOptionHidden(WithOutClassroom)
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (editable && inputRefs.current[editable]) {
      inputRefs.current[editable].focus();
    }
  }, [editable]);

  function handlerRemove(key: string) {
    const allFilter = (item: TMenu) => {
      if (item?.subMenu)
        item.subMenu = item.subMenu.filter(allFilter);

      return item.key !== key;
    };

    setContent(prevContent => prevContent.filter(allFilter));
  }

  function handlerAdd(keys?: string[]) {
    const link: string = "new";

    setContent(prevContent => {
      const newContent = [...prevContent];

      function insertNewItemRecursive(items: TMenu[], currentKeys: string[]): TMenu[] {
        if (currentKeys.length === 1) {
          const targetKey = currentKeys[0];
          return items.map(item => {
            if (item.key === targetKey) {
              const newSubKey = item.subMenu ? `${targetKey}-${item.subMenu.length}` : `${targetKey}-0`;
              const newItem: TMenu = { key: newSubKey, to: link, text: 'Nuevo elemento', displayQuality: '' };
              return { ...item, subMenu: item.subMenu ? [...item.subMenu, newItem] : [newItem] };
            }
            return item;
          });
        } else if (currentKeys.length > 1) {
          const firstKey = currentKeys[0];
          const remainingKeys = currentKeys.slice(1);
          return items.map(item => {
            if (item.key === firstKey && item.subMenu) {
              return { ...item, subMenu: insertNewItemRecursive(item.subMenu, remainingKeys) };
            }
            return item;
          });
        }
        return items; // Si no se encuentra la clave, devuelve el array sin cambios
      }

      if (!keys || keys.length === 0) {
        const newKey = `${newContent.length}`;
        const newItem: TMenu = { key: newKey, to: link, text: 'Nuevo elemento', displayQuality: '' };
        return [...newContent, newItem];
      } else {
        return insertNewItemRecursive(newContent, keys);
      }
    });
  }

  function handlerChangeLink(key, value) {
    setContent(prevContent => {
      return prevContent.map(item => {
        function updateLinkRecursive(currentItem) {
          if (currentItem.key === key) {
            if (currentItem.params) {
              return { ...currentItem, params: { ...currentItem.params, classroomId: value } };
            } else {
              return { ...currentItem, params: { classroomId: value } };
            }
          }
          if (currentItem.subMenu) {
            return { ...currentItem, subMenu: currentItem.subMenu.map(updateLinkRecursive) };
          }
          return currentItem;
        }
        return updateLinkRecursive(item);
      });
    });
  }

  function handlerEditable(key: string) {
    setEditable(key);
  }

  function handlerChange(key: string, event: ChangeEvent<HTMLInputElement>) {
    setContent(prevContent => {
      function updateItemRecursive(items: TMenu[], targetKey: string, newValue: string): TMenu[] {
        return items.map(item => {
          if (item.key === targetKey) {
            return { ...item, text: newValue };
          }
          if (item.subMenu) {
            return { ...item, subMenu: updateItemRecursive(item.subMenu, targetKey, newValue) };
          }
          return item;
        });
      }
      return updateItemRecursive(prevContent, key, event.target.value);
    });
  }

  function handlerSave() {
    setLoading(true);
    (async () => {
      try {

        const lastItem = content.at(-1);
        const id = parseInt(lastItem.key) + 1;

        content.push(...optionHidden.map((item: TMenu, index: number) => ({ ...item, key: id + index })))

        const result = await githubService.updateFileContent("menu", content, 'json');
        console.log(JSON.parse(result));
        // console.log(JSON.stringify(content, null, 2));
      } catch (error) {
        console.error("Error updating menu:", error);
      } finally {
        setLoading(false);
      }
    })();
  }

  return (
    <div ref={divRef} className="p-2 bg-gray-900 text-theme-0">
      <div className="relative flex justify-end items-center bg-gray-800 rounded px-3 h-20">
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl text-center" >Menú</h1>
        <div className="flex h-full gap-4 ">
          <ButtonIcon>
            <AddIcon onClick={() => handlerAdd()} />
          </ButtonIcon>
          <ButtonIcon onClick={handlerSave} disabled={loading}>
            {loading ? <LoadingIcon className="progress" /> : <SaveIcon />}
          </ButtonIcon>
        </div>
      </div>
      <div className="w-[34rem] px-2 mt-3">
        <Ul
          onChange={handlerChange}
          content={content}
          onRemove={handlerRemove}
          onChangeLink={handlerChangeLink}
          onAdd={handlerAdd}
          isEditable={editable}
          onEditable={handlerEditable}
          inputRefs={inputRefs}
        />
      </div >
    </div >
  );
}

type UlProps = {
  content: TMenu[];
  onRemove: (key: string) => void;
  onAdd: (keys: string[]) => void;
  isEditable: string;
  onEditable: (value: string) => void;
  onChangeLink: (key: string, value: string) => void;
  onChange: (key: string, event: ChangeEvent) => void;
  inputRefs: MutableRefObject<{ [key: string]: HTMLInputElement | null }>;
  fatherKey?: string[];
};

function Ul({ content, onRemove, onAdd, isEditable, onChangeLink, onEditable, inputRefs, onChange, fatherKey }: UlProps) {
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
}

type LiProps = {
  value: TMenu;
  onRemove: (key: string) => void;
  onAdd: (keys: string[]) => void;
  isEditable: string;
  onEditable: (value: string) => void;
  onChange: (key: string, event: ChangeEvent) => void;
  onChangeLink: (key: string, value: string) => void;
  inputRefs: MutableRefObject<{ [key: string]: HTMLInputElement | null }>;
  fatherKey?: string[];
};

function Li({ value, onRemove, onAdd, onChangeLink, isEditable, onEditable, inputRefs, onChange, fatherKey }: LiProps) {
  const [isOpen, setIsOpen] = useState(false);

  const keys = fatherKey ? [...fatherKey, value.key] : [value.key];
  const depth = value?.key?.split('-').length;

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
              onChange={(event) => onChange(value.key, event)}
            />
            {(!(value.subMenu) || value.subMenu?.length === 0) &&
              <>
                <LinkIcon />
                <Select options={classroomIdsArray}
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
            {depth < 3 && (
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
}


type SelectProps = {
  options: string[];
  defaultValue?: string;
  onChange: (value: string) => void;
};

function toCamelCase(text: string): string {
  return text.substr(0, 1).toUpperCase() + text.substr(1).replace(/_/g, ' ');
}

function Select({ options, defaultValue = 'new', onChange }: SelectProps) {
  return (
    <select
      className="bg-gray-800 w-32 text-theme-0 rounded-md py-1 px-2 outline-none"
      defaultValue={defaultValue}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
    >
      <option value="new">Sin enlace</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {toCamelCase(option)}
        </option>
      ))}
    </select>
  );
}

