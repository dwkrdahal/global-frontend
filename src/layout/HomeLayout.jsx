import { Outlet } from "react-router-dom";
import {Header, Footer} from "../components";

export default function HomeLayout () {
  return(
    <>
      <Header/>
        <Outlet/>
      <Footer/>
    </>
  )
}