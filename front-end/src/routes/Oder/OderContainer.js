import axios from "axios";
import { useEffect, useState } from "react";
import OderPresenter from "./OderPresenter"

function OderContainer() {
    const [loading, setLoading] = useState(false);
    const [formInfo, setFormInfo] = useState(null);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    function compFormSubmit(e) {
        e.preventDefault();

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
        setFormInfo(data)
    }

    function createCompany() {
        if(formInfo != null){
            console.log(formInfo)
            // axios.post(
            //     process.env.REACT_APP_SPRING_API +"/api/company", formInfo
            // ).then((res)=>{
            //     console.log(res)
            // }).catch((err)=>{
            //     console.log(err)
            // })
        } else return
    }

    useEffect(() => {
        createCompany()
    }, [formInfo])

    const test = (event) => {
        event.preventDefault();
        axios.get(
            process.env.REACT_APP_SPRING_API+"/api/company/1"
            //"https://localhost:8080/api/company/1"
            )
            .then((res) => {
                console.log(res);        
          }).catch((err) => {
                console.log(err);            
          });
      };

    // useEffect(()=>{
    //     console.log(formInfo)
    //     axios.post(process.env.REACT_APP_SPRING_API+"/api/~~", { formInfo })
    //     .then((response)=>{console.log(response.data)})
    //     .catch((error)=>{console.log(error)})
    // }, [formInfo]);

    return (
        <OderPresenter 
            loading = {loading}
            createCompany = {createCompany}
            test = {test}
            compFormSubmit = {compFormSubmit}
        >
            </OderPresenter>
    )
}

export default OderContainer;
