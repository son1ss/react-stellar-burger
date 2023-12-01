import { FormEventHandler, useState } from 'react';

export const useForm = <InputValues>(inputValues: InputValues) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  type SubmitHandler = (values: InputValues) => void;

  const handleSubmit =
    (callback: SubmitHandler): FormEventHandler<HTMLFormElement> =>
    (e) => {
      e.preventDefault();
      callback(values);
    };

  const register = (name: keyof InputValues) => ({
    value: values[name],
    onChange: handleChange,
    name: name,
  });

  return { values, handleChange, setValues, handleSubmit, register };
};
