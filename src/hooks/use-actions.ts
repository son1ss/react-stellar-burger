import { bindActionCreators } from "redux"
import { useTypedDispatch } from "../services"
import { currentBurgerActions } from "../services/burger-constructor"
import { userActions } from "../services/user"

const allActions = {
  ...currentBurgerActions,
  ...userActions
}

export const useActions = () => {
  const dispatch = useTypedDispatch()

  return bindActionCreators(allActions, dispatch)
}