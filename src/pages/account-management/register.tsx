import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forms.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/api';
import { useForm } from '../../hooks/use-form';

const initialData = {
  name: '',
  email: '',
  password: '',
}

type FormData = typeof initialData

export default function Register() {
  const { handleSubmit, register } = useForm<FormData>(initialData);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [registerUser] = useRegisterUserMutation();

  const toggle = () => {
    setVisiblePassword((prev) => !prev);
  };

  const submit = (regData: FormData) => {
    registerUser(regData);
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit(submit)} className={styles.fields}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input {...register('name')} placeholder="Имя" type="text" />
        <Input {...register('email')} placeholder="E-mail"  />
        <Input
          {...register('password')}
          placeholder="Пароль"
          icon="ShowIcon"
          onIconClick={toggle}
          type={visiblePassword ? 'text' : 'password'}
        />
        <Button htmlType="submit">Зарегистрироваться</Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{' '}
          <Link to="/login" className="text text_type_main-default text_color_accent">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
