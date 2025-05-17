import {  ChangeEvent, memo } from 'react';
import type { TClass } from '../types/class';
import { toCamelCase } from '../hooks/to_camel_case';

export type SelectProps = {
  options: TClass[];
  defaultValue?: string;
  onChange: (value: string) => void;
};

const Select = memo(function Select({ options, defaultValue = 'new', onChange }: SelectProps) {
  return (
    <select
      className="bg-gray-800 w-32 text-theme-0 rounded-md py-1 px-2 outline-none"
      defaultValue={defaultValue}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
    >
      <option value="new">Sin enlace</option>
      {options?.map((option) => (
        <option key={option.name} value={option.name}>
          {toCamelCase(option.name)}
        </option>
      ))}
    </select>
  );
});

export default Select;