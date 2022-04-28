import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompCreate from "./CompCreate";

function CompCreateContainer() {
    const [loading, setLoading] = useState(false);
    const [formInfo, setFormInfo] = useState(null);
    const navigation = useNavigate()

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
        };
        //console.log(data.category)

        let formData = new FormData();
        formData.append("picture", e.target.userfile.files[0]);
        formData.append(
            "json", new Blob([JSON.stringify(data)], { type: "application/json" })
        );

        setFormInfo(formData)
    }

    function createCompany() {
        if(formInfo != null){
            axios.post(
                process.env.REACT_APP_SPRING_API +"/api/company/", formInfo, {
                    headers: {
                        "Content-Type": `multipart/form-data`,
                      },
                }
            ).then((res)=>{
                console.log(res)
                alert("업체 등록 완료")
                navigation(-1)
            }).catch((err)=>{
                console.log(err)
            })
        } else return
    }

    useEffect(() => {
        createCompany()
    }, [formInfo])

    // const test = (event) => {
    //     event.preventDefault();
    //     axios.get(
    //         process.env.REACT_APP_SPRING_API+"/api/company/1"
    //         //"https://localhost:8080/api/company/1"
    //         )
    //         .then((res) => {
    //             console.log(res);        
    //       }).catch((err) => {
    //             console.log(err);            
    //       });
    //   };

    return (
        <CompCreate
            loading={loading}
            compFormSubmit = {compFormSubmit}
            createCompany = {createCompany}
            // test = {test}
        ></CompCreate>
    )
}

export default CompCreateContainer;