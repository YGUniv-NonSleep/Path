import { useEffect, useState } from "react";
import axios from "axios";

function useCarPoolPost(){
    const [viewset, setView] = useState(null);
  
    const getView = () => {
      axios
        .get(process.env.REACT_APP_SPRING_API + "/api/carpost/view")
        .then((res) => {
          console.log(res);
          setView(res.data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      getView();
    }, []);

    return {
        viewset, getView
    }
}

export default useCarPoolPost