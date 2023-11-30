import styles from './modal-overlay.module.css'

export default function ModalOverlay({ children, toggle }: { children: React.ReactNode; toggle: () => void }) {
  return (
    <section 
      className={`${styles.overlay}`}
      onClick={toggle}
    >
      {children}
    </section>
  )
}
