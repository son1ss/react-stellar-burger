import { modalOverlayPropTypes } from '../../utils/prop-types'
import styles from './modal-overlay.module.css'

export default function ModalOverlay({ children, toggle }) {
  return (
    <section 
      className={`${styles.overlay}`}
      onClick={toggle}
    >
      {children}
    </section>
  )
}

ModalOverlay.propTypes = modalOverlayPropTypes