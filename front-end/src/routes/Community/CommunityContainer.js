import axios from "axios";
import { useEffect, useState } from "react";
import CommunityPresenter from "./CommunityPresenter"

function CommunityContainer() {
    const [loading, setLoading] = useState(false);
    const [formInfo, setFormInfo] = useState(null);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    function commuSubmit(e) {
        e.preventDefault();

        let data = {
            name: e.target.name.value,
            fff: e.target.fff.value
        }
        
        console.log(data)
        setFormInfo(data)
    }

    useEffect(()=>{
        console.log(formInfo)
        axios.post(process.env.REACT_APP_SPRING_API+"/api/~~", { formInfo })
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.log(error)})
    }, [formInfo]);

    return (
        <CommunityPresenter 
            loading = {loading}
            onSubmit = {commuSubmit}
        >
            </CommunityPresenter>
    )
}

export default CommunityContainer;
