import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forms.module.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../services/api';
import { useForm } from '../../hooks/use-form';

export default function ForgotPassword() {
  const [forgot] = useForgotPasswordMutation();

  const location = useLocation();
  const { push } = useHistory();
  const { handleSubmit, register } = useForm<{ email: string }>({ email: '' });

  const submit = async ({ email }: { email: string }) => {
    const result = await forgot(email);
    if ('data' in result) result.data.success && push('/reset-password', { from: location });
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit(submit)} className={styles.fields}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input {...register('email')} placeholder="Укажите e-mail" type="email" />
        <Button htmlType="submit">Восстановить</Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{' '}
          <Link to="/login" className="text text_type_main-default text_color_accent">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
