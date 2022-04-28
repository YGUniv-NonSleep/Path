import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommunityAdd from "./CommunityAdd";
import CommunityPresenter from "./CommunityPresenter";




function CommunityContainer() {
  const [loading, setLoading] = useState(false);
  const [formInfo, setFormInfo] = useState(null);
  const [board, setBoard] = useState(null);


  const { postId } = useParams();
  console.log(postId);

  useEffect(() => {
    setLoading((current) => !current);
  }, []);


  // function getPostView() {
  //   axios.get(process.env.REACT_APP_SPRING_API + "/api/post/view")
  //   .then((res) => {
  //     console.log(res.data)
  //     setBoard(res.data)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   },[]);
  // }

  function getPostView(){
    return(
      <h2>고객센터입니다</h2>
    )
  }

  useEffect(() => {
    getPostView()
  }, [formInfo]);

  return (
     <CommunityPresenter
      //loading={loading}
      //board={board}
       //onSubmit={commuSubmit}
       >
    </CommunityPresenter>
   
  );
}

export default CommunityContainer;
