import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";
import { ColumnContainer, ColumnTitle } from "./styles";
import { useAppState } from "./state/AppStateContext";
import { moveList, addTask, moveTask, setDraggedItem } from "./state/actions";
import { useRef } from "react";
import { useItemDrag } from "./utils/useItemDrag";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { isHidden } from "./utils/isHidden";

type ColumnProps = {
    text: string;
    id: string;
}

export const Column = ({ text, id }: ColumnProps) => {
    const { draggedItem, getTasksByListId, dispatch } = useAppState();
    const tasks = getTasksByListId(id);
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover: throttle(200, () => {
            if (!draggedItem) return
            if (draggedItem.type === "COLUMN") {
                if (draggedItem.id === id) return
                dispatch(moveList(draggedItem.id, id))
            } else {
                if (draggedItem.columnId === id) return
                if (tasks.length) return

                dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
                dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
            }
        })
    })
    const { drag } = useItemDrag({ type: "COLUMN", id, text })
    drag(drop(ref));
    return (
        <>
            <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id)}>
                <ColumnTitle>{text}</ColumnTitle>
                {tasks.map((task) => (
                    <Card text={task.text} key={task.id} id={task.id} columnId={id} />
                ))}
                <AddNewItem
                    toggleButtonText="+ Add another card"
                    onAdd={(text) => dispatch(addTask(text, id))}
                    dark
                />
            </ColumnContainer>
        </>
    )
}