import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { currentBurgerActions } from "../services/burger-constructor"
import { modalActions } from "../services/modal"

const allActions = {
  ...currentBurgerActions,
  ...modalActions
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}