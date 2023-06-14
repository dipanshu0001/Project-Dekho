import React ,{useState,useEffect,createContext,useContext}from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const FunctionsContext=createContext(null);
function ContextProvide({children}) {
  const[open,setOpen]=useState(false);
  const[Projectcounter,setProjectcounter]=useState(0);
    const set_err = (err, type) => {
        if (type === 1) {
          toast(err);
        } else if (type === 2) {
          toast.warning(err);
        } else {
          toast.error(err);
        }
      };
      const changeToTime = (data) => {
        const date = new Date(data);
        // console.log(date.toDateString())
        return date.toDateString()
      }
      // useEffect(()=>{console.log("open called again",open)},[open])

  return (
    <FunctionsContext.Provider value={{set_err,changeToTime,setOpen,Projectcounter,setProjectcounter}}>
    {open&&<Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
    }
        {children}
    </FunctionsContext.Provider>
  )
}
export const useFunction=()=>useContext(FunctionsContext);
export default ContextProvide