"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import {dataCell, openDB, setDBData} from "@/logic/todoData"
import { useEffect, useState } from "react";


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
  // todo: use effect or some other ways of not using async...
  return (
    <>
      <Sidebar/>
      <Main currentTODOlist={data} setCompletionState={toggleIdx}/>
    </>
  );
}
