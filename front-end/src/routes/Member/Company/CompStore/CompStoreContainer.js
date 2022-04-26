import axios from "axios";
import { useEffect, useState } from "react";
import CompStore from "./CompStore";

function CompStoreContainer() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
    }, []);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SPRING_API +"/api/company/myStore")
        .then((res) => {console.log(res)})
        .catch((err)=>{console.log(err)})
    }, [])
    
    return (
        <CompStore
            loading={loading}
        >
        </CompStore>
    )
}

export default CompStoreContainer;