import { Action } from "../types/tv";

export const getActionFromRequest = (req: any): Action => {
  const action = req.body.action as Action;
  if (!action.type) {
    console.error(action);
    throw "invalid action";
  }
  return action;
};
