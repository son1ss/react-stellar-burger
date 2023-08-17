import { modalOverlayPropTypes } from '../../utils/prop-types'
import styles from './modal-overlay.module.css'

export default function ModalOverlay({ children, opened, toggle }) {

  const handleEsc = event => {
    if (event.key) toggle()
  }

  return (
    <section 
      className={`${styles.overlay} ${!opened && styles.hidden}`}
      onKeyDown={handleEsc}
      onClick={toggle}
    >
      {children}
    </section>
  )
}

ModalOverlay.propTypes = modalOverlayPropTypes