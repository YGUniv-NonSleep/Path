import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useCompCreate() {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState(null);

  async function compFormSubmit(e) {
    e.preventDefault();

    let inputImageFiles = e.target.userfile.files;

    const imageformData = new FormData();
    // FormData에 Key:Value 넣기
    for (var i = 0; i < inputImageFiles.length; i++) {
      imageformData.append("multipartFile", inputImageFiles[i]);
    }

    const imageData = await axios
      .post(`${process.env.REACT_APP_SPRING_API}/api/image`, imageformData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    const data = {
      name: e.target.name.value,
      companyNumber: parseInt(e.target.crn.value),
      openDate: e.target.openDate.value,
      category: e.target.category.value,
      mail: e.target.email.value,
      phone: e.target.phone.value,
      latitude: e.target.lat.value,
      longitude: e.target.long.value,
      thumbnail: imageData.data,
    };

    // let formData = new FormData();
    // formData.append("picture", e.target.userfile.files[0]);
    // formData.append(
    //     "json", new Blob([JSON.stringify(data)], { type: "application/json" })
    // );
    setFormInfo(data);
  }

  function createCompany() {
    if (formInfo != null) {
      axios
        .post(process.env.REACT_APP_SPRING_API + "/api/company/", formInfo)
        .then((res) => {
          console.log(res);
          alert("업체 등록 완료");
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else return;
  }

  useEffect(() => {
    createCompany();
  }, [formInfo]);

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

  return {
    navigate,
    formInfo,
    compFormSubmit,
    createCompany,
  };
}

export default useCompCreate;
