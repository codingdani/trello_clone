//Whereas interfaces are defined as a declaration of the only object type, which means the interfaces are restricted to only object type and do not support any other type for declaration. But we can say that interfaces have more capabilities than types in typescript.

import { DragItem } from "../DragItem"

interface AddListAction {
    type: "ADD_LIST"
    payload: string
}
interface AddTaskAction {
    type: "ADD_TASK"
    payload: {
        text: string
        listId: string
    }
}
interface MoveListAction {
    type: "MOVE_LIST"
    payload: {
        draggedId: string
        hoverId: string
    }
}
interface MoveTaskAction {
    type: "MOVE_TASK"
    payload: {
        draggedItemId: string
        hoveredItemId: string | null
        sourceColumnId: string
        targetColumnId: string
    }
}
interface SetDraggedItemAction {
    type: "SET_DRAGGED_ITEM"
    payload: DragItem | null
}
//discriminated union
export type Action = AddListAction | AddTaskAction | MoveListAction | SetDraggedItemAction | MoveTaskAction

export const addTask = (text: string, listId: string): Action => {
    return (
        {
            type: "ADD_TASK",
            payload: {
                text,
                listId
            }
        }
    )
}

export const addList = (text: string): Action => {
    return (
        {
            type: "ADD_LIST",
            payload: text
        }
    )
}

export const moveList = (draggedId: string, hoverId: string): Action => {
    return (
        {
            type: "MOVE_LIST",
            payload: {
                draggedId,
                hoverId
            }
        }
    )
}

export const moveTask = (draggedItemId: string, hoveredItemId: string | null, sourceColumnId: string, targetColumnId: string): Action => {
    return (
        {
            type: "MOVE_TASK",
            payload: {
                draggedItemId,
                hoveredItemId,
                sourceColumnId,
                targetColumnId
            }
        }
    )
}

export const setDraggedItem = (draggedItem: DragItem | null): Action => {
    return (
        {
            type: "SET_DRAGGED_ITEM",
            payload: draggedItem
        }
    )
}
