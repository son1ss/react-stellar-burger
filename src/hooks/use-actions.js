import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { currentBurgerActions } from "../services/burger-constructor"
import { modalActions } from "../services/modal"
import { userActions } from "../services/user"

const allActions = {
  ...currentBurgerActions,
  ...modalActions,
  ...userActions
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}