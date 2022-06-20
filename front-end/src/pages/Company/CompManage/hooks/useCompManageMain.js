import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useCompManageMain() {
  const [myStore, setMyStore] = useState([]);
  const userStore = useSelector((state) => state.comp.compList)

  return { myStore }
}

export default useCompManageMain;