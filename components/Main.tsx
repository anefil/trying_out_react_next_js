import { dataCell } from "@/logic/todoData"
import { useState } from "react";
import TodoList from "./TodoList";



export default function Main({currentTODOlist,setCompletionState}: {currentTODOlist: dataCell[]|null, setCompletionState: (idx: number, state: boolean) => void}) {
    if(currentTODOlist==null) {
        return <MainSkeleton/> // can't use loading.tsx because its client site await
    };

    return (
        <main>
            <p>TODO app:</p>
            <TodoList currentTODOlist={currentTODOlist} setCompletionState={setCompletionState}/>
        </main>
    );
}

export function MainSkeleton() {
    return (
        <main>
            <p>TODO app:</p>
            <p>Loading...</p>
        </main>
    )
}