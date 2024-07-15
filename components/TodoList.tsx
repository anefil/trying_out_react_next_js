import { dataCell } from "@/logic/todoData";

export default function TodoList({currentTODOlist, setCompletionState}: {currentTODOlist: dataCell[], setCompletionState: (idx: number, state: boolean) => void}) {
    return (
        <ul>
            {
                currentTODOlist.map((v,i) => {
                    return (
                        <TodoListElement element={v} setCompletionState={setCompletionState} key={v.timeID}/>
                    );
                })
            }
        </ul>
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