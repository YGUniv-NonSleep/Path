import { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter"
import axios from "axios";

function HomeContainer() {
    // 여기서 api 같은거 가져와서 HomePresenter로 props 넘겨줌.
    const [time, setTime] = useState("");
    const [id, setId] = useState("");
    const [getId, setGetId] = useState(null);

    const writeId = (event) => {
        setId(event.target.value)
        console.log(event.target.value)
    }

    async function get() {
        const result = await axios.get("/test")
        setTime(result.data)
        //console.log(result.data)
    }
    useEffect(() => {    
        get();
    }, [])

    async function post() {
        try {            
            const result = await axios.post("/test", {
                Id: id,
            });
            console.log(result)
            setGetId(result.data)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <HomePresenter 
            nowTime={time}
            onChange={writeId}
            userId={id}
            postId={post}
            getId={getId}
        />
    )
}

export default HomeContainer;