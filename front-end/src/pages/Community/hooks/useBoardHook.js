import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function useBoardHook() {
  const [formInfo, setFormInfo] = useState(null);

  const [board, setBoard] = useState(null);
  const [boardState, setBoardState] = useState(true);
  const [category, setCategory] = useState("");

  const { postId } = useParams();
  // console.log(postId)

  const [keyword, setKeyword] = useState(null);
  const [searched, setSearched] = useState(false);

  const [paging, setPaging] = useState(null);
  const [pageState, setPageState] = useState(false);

  const [paging2, setPaging2] = useState(null);
  const [pageState2, setPageState2] = useState(false);

  const [paging3, setPaging3] = useState(null);
  const [pageState3, setPageState3] = useState(false);

  const [paging4, setPaging4] = useState(null);
  const [pageState4, setPageState4] = useState(false);

  const [numbering, setNumbering] = useState(true);

  const [notice, setNotice] = useState(null);
  const [noticeState, setNoticeState] = useState(false);

  const [QNA, setQNA] = useState(null);
  const [qnaState, setQNAState] = useState(false);

  const [complaint, setComplaint] = useState(null);
  const [comState, setComState] = useState(false);

  const [FAQ, setFAQ] = useState(null);
  const [faqState, setFaqState] = useState(false);

  const [buttonState, setButtonState] = useState(true);

  const keywordSubmit = (e) => {
    e.preventDefault();

    var data = {
      keyword: e.target.keyword.value,
    };
    console.log(data);

    axios
      .get(
        process.env.REACT_APP_SPRING_API +
          "/api/post/view/search?keyword=" +
          data.keyword
      )
      .then((res) => {
        console.log(res.data.body);
        setKeyword(res.data.body);
        setSearched(true);

        setQNAState(false);
        setNoticeState(false);
        setComState(false);
        setFaqState(false);

        setPageState(false);
        setPageState2(false);
        setPageState3(false);
        setPageState4(false);
        setButtonState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      "key",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios
      .post(process.env.REACT_APP_SPRING_API + "/api/post/create", formData, {
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

  const noticePaging = (e) => {
    e.preventDefault();
    var data = {
      page: e.target.value - 1,
      type: "NOTICE",
    };
    console.log(data);

    axios
      .get(
        process.env.REACT_APP_SPRING_API +
          "/api/post/view?page=" +
          data.page +
          "&type=" +
          data.type
      )
      .then((res) => {
        console.log(res.data.body);
        setPaging(res.data.body);
        
        setPageState(true);
        setPageState2(false);
        setPageState3(false);
        setPageState4(false);
        
        setSearched(false)
        setNoticeState(false);
        setComState(false);
        setQNAState(false);
        setFaqState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const QnAPaging = (e) => {
    e.preventDefault();
    var data = {
      page: e.target.value - 1,
      type: "QNA",
    };
    console.log(data);

    axios
      .get(
        process.env.REACT_APP_SPRING_API +
          "/api/post/view?page=" +
          data.page +
          "&type=" +
          data.type
      )
      .then((res) => {
        console.log(res.data.body);
        setPaging2(res.data.body);

        setPageState(false);
        setPageState2(true);
        setPageState3(false);

        setNoticeState(false);
        setComState(false);
        setQNAState(false);
        setFaqState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ComplaintPaging = (e) => {
    e.preventDefault();
    var data = {
      page: e.target.value - 1,
      type: "COMPLAINT",
    };
    console.log(data);

    axios
      .get(
        process.env.REACT_APP_SPRING_API +
          "/api/post/view?page=" +
          data.page +
          "&type=" +
          data.type
      )
      .then((res) => {
        console.log(res.data.body);
        setPaging3(res.data.body);

        setPageState(false);
        setPageState2(false);
        setPageState3(true);

        setNoticeState(false);
        setComState(false);
        setQNAState(false);
        setFaqState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FaQPaging = (e) => {
    e.preventDefault();
    var data = {
      page: e.target.value - 1,
      type: "FAQ",
    };
    console.log(data);

    axios
      .get(
        process.env.REACT_APP_SPRING_API +
          "/api/post/view?page=" +
          data.page +
          "&type=" +
          data.type
      )
      .then((res) => {
        console.log(res.data.body);
        setPaging4(res.data.body);

        setPageState(false);
        setPageState2(false);
        setPageState3(false);
        setPageState4(true);

        setNoticeState(false);
        setComState(false);
        setQNAState(false);
        setFaqState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const categoryType = (e) => {
    e.preventDefault();

    let data = {
      type: e.target.value,
    };
    console.log(data.type);

    axios
      .get(
        process.env.REACT_APP_SPRING_API + "/api/post/view?type=" + data.type
      )
      .then((res) => {
        console.log(res);
        if(data.type == "NOTICE") setNotice(res.data);
        if(data.type == "QNA") setQNA(res.data);
        if(data.type == "COMPLAINT") setComplaint(res.data);
        if(data.type == "FAQ") setFAQ(res.data);
        
        setCategory(data.type + "")

        setSearched(false)
        setPageState(false);
        setPageState2(false);
        setPageState3(false);
        setPageState4(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if(category==="NOTICE"){
      setNoticeState(true);
      setFaqState(false);
      setComState(false);
      setQNAState(false);
    } 
    if(category==="QNA"){
      setQNAState(true);
      setFaqState(false);
      setComState(false);
      setNoticeState(false);
    } 
    if(category==="COMPLAINT"){
      setComState(true);
      setFaqState(false);
      setQNAState(false);
      setNoticeState(false);
    } 
    if(category==="FAQ"){
      setFaqState(true);
      setComState(false);
      setQNAState(false);
      setNoticeState(false);
    }
  }, [category])

  // useEffect(() => {
  //   // console.log(formInfo);
  //   axios
  //     .get(process.env.REACT_APP_SPRING_API + "/api/post/view")
  //     .then((response) => {
  //       console.log(response.data);
  //       setBoard(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [formInfo]);

  return { 
    formInfo, board, keyword, searched, paging, pageState, 
    paging2, pageState2, paging3, pageState3, paging4, pageState4, 
    numbering, notice, noticeState, QNA, qnaState, 
    complaint, comState, FAQ, faqState, buttonState, category, 
    keywordSubmit, commuSubmit, categoryType, 
    noticePaging, QnAPaging, ComplaintPaging, FaQPaging, 
    setBoard, setBoardState, setNumbering, setButtonState, 
    postId 
  }
}

export default useBoardHook;
