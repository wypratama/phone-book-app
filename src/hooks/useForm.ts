import { useEffect, useRef, useState } from 'react';

type FormValidationConstructor<T> = {
  [key in keyof T]: {
    [key: string | symbol | number]: {
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      validator: (value: any, formValue: T) => boolean;
      message: string;
    };
  };
};

type FormErrorConstructor<A> = { isError: boolean } & {
  [key in keyof A]: { constraint: string; message: string }[];
};

const useForm = <T extends object>(
  state: T,
  validations: FormValidationConstructor<Partial<T>>
) => {
  const [formInput, setFormInput] = useState(state);
  const dirty = useRef(false);

  const [errors, setErrors] = useState<FormErrorConstructor<T>>(() => {
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    const errorObject: Record<string, any> = {
      isError: false,
    };
    for (const key of Object.getOwnPropertyNames(state)) {
      errorObject[key] = [];
    }
    return errorObject as FormErrorConstructor<T>;
  });

  function runValidation(key: string, value: T[keyof T]) {
    const errorList: Record<string, { constraint: string; message: string }> =
      {};
    for (const constraint in validations[key as keyof T]) {
      const isValid = validations[key as keyof T][constraint].validator(
        value,
        formInput
      );

      if (!isValid) {
        errorList[constraint] = {
          constraint,
          message: validations[key as keyof T][constraint].message,
        };
      }
    }
    const { isError, ...listErrors } = errors;
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    (listErrors as any)[key] = [...Object.values(errorList)];

    if (!dirty.current) return errors;
    return {
      isError: !Object.values(listErrors).every(
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        (el) => (el as any[]).length === 0
      ),
      ...listErrors,
    } as FormErrorConstructor<T>;
  }

  const setValue = (val: Partial<T>) => {
    setFormInput({ ...formInput, ...val });
    reset();
  };

  const validate = () => {
    dirty.current = true;
    const listAll: FormErrorConstructor<T> | {} = {};
    for (const [key, value] of Object.entries(formInput)) {
      const a = runValidation(key, value as T[keyof T]);
      (listAll as FormErrorConstructor<T>)[key as keyof T] = a[key as keyof T];
      (listAll as FormErrorConstructor<T>).isError = a.isError;
    }
    setErrors(listAll as FormErrorConstructor<T>);
    return !(listAll as FormErrorConstructor<T>).isError;
  };

  const reset = () => {
    dirty.current = false;
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    const errorObject: Record<string, any> = {
      isError: false,
    };
    for (const key of Object.getOwnPropertyNames(state)) {
      errorObject[key] = [];
    }
    setErrors(errorObject as FormErrorConstructor<T>);
  };

  const handler: ProxyHandler<T> = {
    get(target, key: string) {
      return target[key as keyof T];
    },
    set(target, key: string, value: T[keyof T]) {
      const res = runValidation(key, value);
      setErrors(res);
      setFormInput({ ...target, [key]: value });
      return true;
    },
  };

  const value = new Proxy<T>(formInput, handler);

  useEffect(() => {
    dirty.current = false;
  }, []);

  return {
    value,
    dirty: dirty.current,
    validate,
    errors,
    reset,
    setValue,
  };
};

export default useForm;
