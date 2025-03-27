import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/header";
import Testmonial from "@/components/testmonial";
import DressStyle from "@/components/DressStyle";

export default function Home() {
  return (
    <>
      <Header />
      <Testmonial />
      <DressStyle/>
    </>
  );
}
