import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useCompCreate() {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const [coord, setCoord] = useState(null);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    // 주소 저장, 닫기 처리, 좌표 수집
    setAddress({
      fullAddress: data.address,
      zoneCode: data.zonecode,
    });
    handleClose();
    getCoords(data.address);
  };

  async function getCoords(data) {
    let geocoder = new kakao.maps.services.Geocoder();

    if (geocoder != null) {
      await geocoder.addressSearch(data, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          // console.log(result[0].x);
          // console.log(result[0].y);
          setCoord({
            x: result[0].x,
            y: result[0].y,
          });
        }
      });
    } else return;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (open === true) return setOpen(false);
  };

  async function compFormSubmit(e) {
    e.preventDefault();
    // 회원 입력 처리 필요
    let inputImageFiles = e.target.userfile.files;

    const imageFormData = new FormData();
    let imageData = null;

    if (inputImageFiles.length == 0) {
      imageData = {
        data: "blankImage",
      };
    } else {
      // FormData에 Key:Value 넣기
      for (var i = 0; i < inputImageFiles.length; i++) {
        imageFormData.append("multipartFile", inputImageFiles[i]);
      }

      imageData = await axios
        .post(process.env.REACT_APP_SPRING_API + `/api/image`, imageFormData, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const data = {
      name: e.target.name.value,
      companyNumber: parseInt(e.target.companyNumber.value),
      openDate: e.target.openDate.value,
      category: e.target.category.value,
      mail: e.target.email.value,
      phone: e.target.phone.value,
      addr: address.fullAddress,
      addrDetail: e.target.subJuso.value,
      lat: parseFloat(coord.x),
      lng: parseFloat(coord.y),
      open: `${e.target.oTime.value}:00`,
      close: `${e.target.cTime.value}:00`,
      thumbnail: imageData.data,
    };
    console.log(data)
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
          navigate("/company/store");
        })
        .catch((err) => {
          console.log(err);
        });
    } else return;
  }

  useEffect(() => {
    createCompany();
  }, [formInfo]);

  return {
    navigate,
    formInfo,
    address,
    compFormSubmit,
    createCompany,
    open,
    handleOpen,
    handleClose,
    handleComplete,
  };
}

export default useCompCreate;
