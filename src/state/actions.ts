//Whereas interfaces are defined as a declaration of the only object type, which means the interfaces are restricted to only object type and do not support any other type for declaration. But we can say that interfaces have more capabilities than types in typescript.

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
//discriminated union
export type Action = AddListAction | AddTaskAction

export const addTask = (text: string, listId: string): Action => (
    {
        type: "ADD_TASK",
        payload: {
            text,
            listId
        }
    }
)

export const addList = (text: string): Action => (
    {
        type: "ADD_LIST",
        payload: text
    }
)
