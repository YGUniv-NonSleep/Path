import axios from "axios";
import { useEffect, useState } from "react";
import CommunityPresenter from "./CommunityPresenter";

function CommunityContainer() {
  const [loading, setLoading] = useState(false);
  const [formInfo, setFormInfo] = useState(null);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    setLoading((current) => !current);
  }, []);

  function commuSubmit(e) {
    e.preventDefault();

    var data = {
      title: e.target.title.value,
      content: e.target.content.value,
      type: e.target.type.value,
      member: {
        id: 1,
      },
    };

    var formData = new FormData();
    formData.append("userfile", e.target.userfile.files[0]);
    formData.append(
      "key", new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios.post(process.env.REACT_APP_SPRING_API + "/api/post/create", formData, {
        //withCredentials: true,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        // console.log(res);
        console.log(res.data.body);
        setFormInfo(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log(formInfo);
    axios.get(process.env.REACT_APP_SPRING_API + "/api/post/view")
      .then((response) => {
        // console.log(response.data);
        setBoard(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [formInfo]);

  return (
    <CommunityPresenter
      loading={loading}
      onSubmit={commuSubmit}
      board={board}
    ></CommunityPresenter>
  );
}

export default CommunityContainer;
