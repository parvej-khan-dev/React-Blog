import { useEffect, useState } from "react";
import "./App.css";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import {login, logout} from "./store/reducers/authSlice"
 
 
function App() {
  const [isLoading, setLoading] = useState(true)

    const dispatch = useDispatch()
   
  useEffect(()=> {
      authService.getCurrentUser ()
      .then((userData) => {
        if(userData){
          dispatch(login({userData}))
          setLoading(false)
        }else{
          dispatch(logout())
        }
       
      })
      .finally(
         setLoading(false)
      )

     
    }
  ,[])

  if(!isLoading) return <div>Loading...</div>
  return (
    <>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
