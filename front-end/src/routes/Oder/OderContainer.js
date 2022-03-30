import axios from "axios";
import { useEffect, useState } from "react";
import OderPresenter from "./OderPresenter"

function OderContainer() {
    const [loading, setLoading] = useState(false);
    //const [formInfo, setFormInfo] = useState(null);

    useEffect(() => {
        setLoading((current) => !current);
        
    }, []);

    const res = null;

    function oderSubmit(e) {
        e.preventDefault();

        console.log('ㅎㅇㅎㅇ')

        const data = {    
            "name": e.target.name.value,
            "companyNumber":parseInt(e.target.crn.value),
            "openDate": e.target.openDate.value,
            "category": e.target.category.value,
            "mail": e.target.email.value,
            "phone": e.target.phone.value,
            "latitude": e.target.lat.value,
            "longitude": e.target.long.value,        
            "member":{
                "id":1
            }           
        }

        //const json = JSON.parse(data)
        // const json = JSON.stringify(data)
        console.log(data)

        // console.log(data)
        //setFormInfo(data)

        axios.post(
            process.env.REACT_APP_SPRING_API +"/api/company/create",data
        ).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }

    // useEffect(()=>{
    //     console.log(formInfo)
    //     axios.post(process.env.REACT_APP_SPRING_API+"/api/~~", { formInfo })
    //     .then((response)=>{console.log(response.data)})
    //     .catch((error)=>{console.log(error)})
    // }, [formInfo]);

    return (
        <OderPresenter 
            loading = {loading}
            onSubmit = {oderSubmit}
            res = {res}
        >
            </OderPresenter>
    )
}

export default OderContainer;
