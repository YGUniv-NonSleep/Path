import axios from "axios";
import { useEffect, useState } from "react";
import OderPresenter from "./OderPresenter"

function OderContainer() {
    const [loading, setLoading] = useState(false);
    const [formInfo, setFormInfo] = useState(null);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    function oderSubmit(e) {
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
        <OderPresenter 
            loading = {loading}
            onSubmit = {oderSubmit}
        >
            </OderPresenter>
    )
}

export default OderContainer;
