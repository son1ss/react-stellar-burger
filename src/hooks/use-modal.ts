import { useState } from "react"

export const useModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggle = () => {
    setIsOpen(isOpen => !isOpen)
  }

  return [
    isOpen,
    toggle
  ]
}