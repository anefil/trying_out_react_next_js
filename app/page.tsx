'use client';

import Image from "next/image";
import {dataCell, openDB, setDBData} from "@/logic/todoData"
import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import { Box, Container, Text } from "@chakra-ui/react";


export default function Home() {
  let [data,setData] = useState(null as dataCell[]|null);
  useEffect(() => {
    openDB().then((v => {
      setData(v);
    }));
  });
  function toggleIdx(idx: number, state: boolean) {
    if(data===null) {
      throw new Error("DB is not initialized.");
    }
    let realId = data.findIndex((v) => v.timeID===idx);
    let {completed,text,timeID} = data[realId];
    let result = [...data];
    result[realId] = {
      completed: state,
      text,
      timeID
    };
    setData(result);
    setDBData({
      completed: state,
      text,
      timeID
    });
  }
  function addNewElement(text: string) {
    let oldSetData = setData;
    function callback() {
      let result = [...(data as dataCell[])];
      let obj: dataCell = {
        completed: false,
        text,
        timeID: + new Date()
      };
      result.push(obj);
      oldSetData(result);
      setDBData(obj);
    };
    
    if (data===null) {
      throw new Error("DB data is not retieved yet.");
    } else {
      callback();
    }
  }
  // todo: use effect or some other ways of not using async...
  return (
    <>
      <Main currentTODOlist={data} setCompletionState={toggleIdx} addNewElement={addNewElement}/>
    </>
  );
}



function Main(
    {currentTODOlist,setCompletionState,addNewElement}: 
    {
        currentTODOlist: dataCell[]|null, 
        setCompletionState: (idx: number, state: boolean) => void,
        addNewElement: (text: string) => void
    }
) {
    if(currentTODOlist==null) {
        return <MainSkeleton/> // can't use loading.tsx because its client site await
    };

    return (
        <Container my="10" maxW="80%">
            <Text fontSize="xl" fontWeight="black" mb="6">
              TODO app:
            </Text>
            <TodoList currentTODOlist={currentTODOlist} setCompletionState={setCompletionState} addNewElement={addNewElement}/>
        </Container>
    );
}

function MainSkeleton() {
    return (
        <Container my="10" maxW="80%">
            <Text fontSize="xl" fontWeight="black" mb="6">
              TODO app:
            </Text>
            <Text fontSize="lg" fontWeight="medium" mb="6">
              Loading...
            </Text>
        </Container>
    )
}