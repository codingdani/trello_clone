import { Action } from "./actions";
import { nanoid } from "nanoid";
import { findItemIndexById } from "../utils/arrayUtils";

export type Task = {
    id: string;
    text: string;
}

export type List = {
    id: string;
    text: string;
    tasks: Task[];
}

export type AppState = {
    lists: List[];
}

//state is called draft here, because we are using the libary immer to mutate this object directly.
//This way we remind ourselves that it is not a regular reducer state and we don't have to worry about the immutability.
export const appStateReducer = (draft: AppState, action: Action): AppState | void => {
    switch (action.type) {
        case "ADD_LIST": {
            draft.lists.push({
                id: nanoid(),
                text: action.payload,
                tasks: []
            })
            break;
        }
        case "ADD_TASK": {
            const { text, listId } = action.payload;
            const targetListIndex = findItemIndexById(draft.lists, listId)

            draft.lists[targetListIndex].tasks.push({
                id: nanoid(),
                text
            })
            break;
        }
    }
}