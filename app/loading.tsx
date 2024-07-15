import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar";
import { MainSkeleton } from "@/components/Main";



export default function LoadingHome() {

  return (
    <>
      <Sidebar/>
      <MainSkeleton/>
    </>
  );
}
