import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from 'react-router-dom' 
import { useEffect, useState } from "react";
import axios from "axios";

const CommuSubCon = styled.div`
  margin-left: 130px;
`;
const CommuBoard = styled.th`
  border: 1px solid black;
`;
const CommuBoard2 = styled.td`
  border: 1px solid black;
`;
const NullCommuBoard = styled.td`
  border: 1px solid black;
  text-align: center;
`;


function CarPoolPresenter(props) {
    const [viewset,SetView] = useState(null);
    const View = () =>{
        axios.get(process.env.REACT_APP_SPRING_API + '/api/carpost/view')
        .then((res)=>{
            console.log(res)
            SetView(res.data.body);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        View();
    },[])


    return (
        <div className="CarPool">
           <CommuSubCon>
               <table>
                    <tr>
                        <CommuBoard>게시글번호</CommuBoard>
                        <CommuBoard>제목</CommuBoard>
                        <CommuBoard>지역</CommuBoard>
                        <CommuBoard>탑승인원</CommuBoard>
                    </tr>
                       {viewset == null | viewset == '' ? 
                        <tr><NullCommuBoard colSpan={6}>게시글 없음</NullCommuBoard></tr>
                       : (
                           viewset.map((result) =>{
                               return (
                                   <tr key = {result.id}>
                                     <CommuBoard2>{result.id}</CommuBoard2>
                                     <CommuBoard2>
                                         <Link 
                                            to={{pathname : `/carpool/${result.id}`}}>
                                            {result.title}</Link>
                                    </CommuBoard2>
                                     <CommuBoard2>{result.local}</CommuBoard2>
                                     <CommuBoard2>{result.recruit}</CommuBoard2>  
                                   </tr>
                               );
                           })
                       )}
               </table>
               <button><Link to={{pathname : '/carpool/add'}}>등록하기</Link></button>
           </CommuSubCon>
        </div>
    )
}

CarPoolPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CarPoolPresenter;