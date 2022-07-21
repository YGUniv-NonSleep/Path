import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CompEdit() {
  const { comId } = useParams();
  const [comInfo, setComInfo] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [openTime, setOpenTime] = useState(null);
  const [closeTime, setCloseTime] = useState(null);
  const [updateForm, setUpdateForm] = useState([]);
  const [addr, setAddr] = useState(null);

  async function getCompInfo() {
    try {
      let info = await axios.get(
        `${process.env.REACT_APP_SPRING_API}/api/company/${comId}`
      );
      console.log(info);
      setComInfo(info.data.body);
      setUpdateForm(info.data.body);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCompInfo(e) {
    try {
      e.preventDefault();

      let inputImageFiles = e.target.updateImg.files;
      console.log(inputImageFiles)

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
        console.log(imageFormData)

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
      console.log(imageData)

      var data = {
        addr: updateForm.addr,
        addrDetail: updateForm.addrDetail,
        category: updateForm.category,
        close: updateForm.close,
        companyNumber: updateForm.companyNumber,
        id: updateForm.id,
        latitude: updateForm.latitude,
        longitude: updateForm.longitude,
        mail: updateForm.mail,
        member: updateForm.member,
        name: updateForm.name,
        open: updateForm.open,
        openDate: null,
        phone: updateForm.phone,
        thumbnail: imageData.data,
        waitTime: updateForm.waitTime,
      }
      
      if(toggle != true) {
        data.open = comInfo.open
        data.close = comInfo.close
      }
      console.log(data)

      let result = await axios.patch(`${process.env.REACT_APP_SPRING_API}/api/company/`, data)
      if(result)
      console.log(result)
      
    } catch (error) {
      console.log(error);
    }
  }

  async function getCoords(data) {
    let geocoder = new kakao.maps.services.Geocoder();

    if (geocoder != null) {
      await geocoder.addressSearch(data, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result[0]);
          setUpdateForm({
            ...updateForm,
            ["addr"]: result[0].address_name,
            ["longitude"]: parseFloat(result[0].x),
            ["latitude"]: parseFloat(result[0].y)
          })
        }
      });
    } else return;
  }

  const daumAddrApi = () => {
    new daum.Postcode({
      oncomplete: async function (data) {
        // 팝업에서 검색결과 항목을 클릭했을 때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        let addrApi = ""; // 주소 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          addrApi = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addrApi = data.jibunAddress;
        }

        setAddr(addrApi)

        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("addrDetail").focus();
      },
    }).open();
  };

  async function coords() {
    await getCoords(addr)
  }

  useEffect(()=>{
    coords()
  }, [addr])

  function createDaumJusoScript() {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;

    return script;
  }

  useEffect(() => {
    const script = createDaumJusoScript();
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const handleOpenTime = (newValue) => {
    const dateFormat = dayjs(newValue).format("HH:mm:ss");
    setOpenTime(newValue);
    setUpdateForm({
        ...updateForm,
        ["open"]: dateFormat
      })
  };

  const handleCloseTime = (newValue) => {
    const dateFormat = dayjs(newValue).format("HH:mm:ss");
    setCloseTime(newValue);
    setUpdateForm({
        ...updateForm,
        ["close"]: dateFormat
      })
  };

  useEffect(() => {
    getCompInfo();
    return () => {
      setComInfo([]);
      setUpdateForm([]);
    };
  }, []);

  return {
    comInfo,
    updateForm,
    openTime,
    closeTime,
    toggle,
    handleToggle,
    handleInput,
    updateCompInfo,
    handleOpenTime,
    handleCloseTime,
    createDaumJusoScript,
    daumAddrApi,
  };
}

export default CompEdit;
