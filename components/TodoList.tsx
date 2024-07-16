"use client";
import { dataCell } from "@/logic/todoData";
import { useRef } from "react";

export default function TodoList(
    {currentTODOlist, setCompletionState, addNewElement}: 
    {
        currentTODOlist: dataCell[], 
        setCompletionState: (idx: number, state: boolean) => void,
        addNewElement: (text: string) => void
    }
) {
    let newTODOinput = useRef(null as unknown as HTMLInputElement);

    return (
        <>
        <ul>
            {
                currentTODOlist.map((v,i) => {
                    return (
                        <TodoListElement element={v} setCompletionState={setCompletionState} key={v.timeID}/>
                    );
                })
            }
        </ul>
        <div>
            <input type="text" placeholder="New TODO text..." ref={newTODOinput}/>
            <button onClick={() => {
                addNewElement(newTODOinput.current.value);
                newTODOinput.current.value = "";
            }}>Add new TODO element</button>
        </div>
        </>
    )
}

export function TodoListElement(
    {element, setCompletionState}: {element: dataCell, setCompletionState: (idx: number, state: boolean) => void}) {
    return (
        <li key={element.timeID}>
            <input type="checkbox" defaultChecked={element.completed} onClick={ev => setCompletionState(element.timeID,(ev.currentTarget as HTMLInputElement).checked)} />
            {element.text}
        </li>
    )

}