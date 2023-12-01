import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

type Props = {
  title?: string;
  children: React.ReactNode;
  toggle: () => void;
};

const modalElement = document.querySelector('#modals')

export default function Modal({ title, children, toggle }: Props) {

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") toggle()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, true)
    return () => {document.removeEventListener('keydown', handleEsc, true)}
  }, [])

  if (!modalElement) return <></>

  return createPortal(
    <ModalOverlay toggle={toggle}>
      <div className={`pt-10 pl-10 pr-10 ${styles.card}`} onClick={event => event.stopPropagation()}>
        <div className={styles.head}>
          <button className={styles.close}>
            <CloseIcon type="primary" onClick={toggle} />
          </button>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
        </div>
        {children}
      </div>
    </ModalOverlay>
  , modalElement)
}
