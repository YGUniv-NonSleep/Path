import { useEffect, useState } from "react";

// 화면 로딩 확인 hook
function useLoading(){
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
  }
  
  useEffect(() => {
    handleLoading()
    return () => {
      setLoading(false);
    }
  }, []);

  return { loading, handleLoading }
}

export default useLoading;