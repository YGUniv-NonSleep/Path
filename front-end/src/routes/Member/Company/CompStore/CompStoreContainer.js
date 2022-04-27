import axios from "axios";
import { useEffect, useState } from "react";
import CompStore from "./CompStore";

function CompStoreContainer() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    const [myStore, setMyStore] = useState([]);
    
    useEffect(() => {
        setLoading(true);
    }, []);

    function getStore() {
        console.log(myStore)
        axios.get(process.env.REACT_APP_SPRING_API +"/api/company/myStore")
        .then((res) => {
            console.log(res)
            setMyStore((cur)=>[...cur, res.data.body])
        })
        .catch((err)=>{console.log(err)})
    }

    useEffect(() => {
        getStore()
        return () => {
            setMyStore([]) // unmount
        }
    }, [])
    
    return (
        <CompStore
            loading={loading}
            myStore={myStore}
        >
        </CompStore>
    )
}

export default CompStoreContainer;