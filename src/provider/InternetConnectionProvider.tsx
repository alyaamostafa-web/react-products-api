import { ToastId, useToast } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useAppDispatch } from "../app/store";
import { networkMode } from "../app/features/NetworkSlice";

interface Iprops {
  children: ReactNode;
}

const InternetConnectionProvider = ({ children }: Iprops) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>();
  const [isOnline, setIsOnline] = useState(true);

  function close() {
    // toast.closeAll(toastIdRef.current)
    toast.closeAll();
  }

  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, []);
  const addToast = () => {
    toastIdRef.current = toast({
      title: "You're offline.",
      description: "Please check your internet connection!",
      status: "warning",
      duration: 9000,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    });
  };

  const setOffline =()=>{
    setIsOnline(false);
    addToast()
    dispatch(networkMode(false)); 
  }
  const setOnline =()=>{
    setIsOnline(true);
    close();
    dispatch(networkMode(true)); 
  }
  useEffect(() => {
    window.addEventListener("offline", setOffline);
  
    window.addEventListener("online", setOnline);

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, [])
  



  if (!isOnline) {
    return (
      <>
        {children} 
      </>
    );
  }

  return children;
};
export default InternetConnectionProvider;
