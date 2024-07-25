// src/utils/formHelpers.ts
import { useState, ChangeEvent } from 'react';

export function useFormFields<T>(initialState: T): [T, (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void] {
  const [fields, setValues] = useState<T>(initialState);

  return [
    fields,
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues({
        ...fields,
        [event.target.name]: event.target.value
      });
    }
  ];
}