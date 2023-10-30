import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { createPortal } from 'react-dom'
import { modalPropTypes } from '../../utils/prop-types'
import { useEffect } from 'react'

export default function Modal({ title, children, toggle }) {

  const handleEsc = event => {
    if (event.key === "Escape") toggle()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, true)
    return () => {document.removeEventListener('keydown', handleEsc, true)}
  }, [])

  return createPortal(
    <ModalOverlay toggle={toggle}>
      <div className={`pt-10 pl-10 pr-10 ${styles.card}`} onClick={event => event.stopPropagation()}>
        <div className={styles.head}>
          <button className={styles.close}>
            <CloseIcon onClick={toggle} />
          </button>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
        </div>
        {children}
      </div>
    </ModalOverlay>
  , document.body)
}

Modal.propTypes = modalPropTypes