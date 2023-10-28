import { useState } from "react";

export const useForm = (inputValues = {}) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (callback) => {
    return e => {
      e.preventDefault()
      callback(values)
    }
  }

  const register = (name) => ({
    value: values[name],
    onChange: handleChange,
    name: name
  })

  return { values, handleChange, setValues, handleSubmit, register };
}