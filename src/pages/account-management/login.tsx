import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forms.module.css';
import { useState } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { LoginRequest, useLoginUserMutation } from '../../services/api';
import { useActions } from '../../hooks/use-actions';
import { useForm } from '../../hooks/use-form';

export default function Login() {
  const { setUser } = useActions();
  const history = useHistory();
  const location = useLocation<{ from?: Location }>();
  const { handleSubmit, register } = useForm<LoginRequest>({
    email: '',
    password: '',
  });

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [login] = useLoginUserMutation();

  const toggle = () => {
    setVisiblePassword((prev) => !prev);
  };

  const submit = async (formData: LoginRequest) => {
    const result = await login(formData);
    if ('data' in result && result.data.user) {
      setUser(result.data.accessToken);
      localStorage.setItem('refreshToken', result.data.refreshToken);
      history.push(location.state?.from || '/');
    }
  };

  if (localStorage.getItem('refreshToken')) return <Redirect to="/profile" />;

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit(submit)} className={styles.fields}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <Input {...register('email')} placeholder="E-mail" type="email" />
        <Input
          {...register('password')}
          placeholder="Пароль"
          icon="ShowIcon"
          onIconClick={toggle}
          type={visiblePassword ? 'text' : 'password'}
        />
        <Button htmlType="submit">Войти</Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{' '}
          <Link to="/register" className="text text_type_main-default text_color_accent">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{' '}
          <Link to="/forgot-password" className="text text_type_main-default text_color_accent">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
}
