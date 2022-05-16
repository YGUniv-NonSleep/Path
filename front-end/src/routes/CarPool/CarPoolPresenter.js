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
const OptionBar = styled.option`
    text-align : center;
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


    const findKeyword = (e) =>{
        e.preventDefault();

        var data = {
            keyword : e.target.keyword.value,
            option : document.getElementById('selectValue').value
        }
        axios.get(process.env.REACT_APP_SPRING_API + `/api/carpost/view/?keyword=${data.keyword}&option=${data.option}`)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{ 
            console.log(err.data);
        })
    }

    return (
        <div className="CarPool">
           <CommuSubCon>
               <div style={{float : 'right'}}>
                   <form onSubmit={findKeyword}>
                    <select id="selectValue">
                        <OptionBar>========선택========</OptionBar>
                        <OptionBar name="option" value="1">시,군,구 검색</OptionBar>
                        <OptionBar name="option" value="2">읍,면,동 검색</OptionBar>
                    </select>
                   <input type="text" placeholder="검색어를 입력하세요" name="keyword"></input>
                   <button type="submit">검색</button>
                   </form>
               </div>
               <table>
                    <tr>
                        <CommuBoard>게시글번호</CommuBoard>
                        <CommuBoard>제목</CommuBoard>
                        <CommuBoard>출발지역</CommuBoard>
                        <CommuBoard>도착지역</CommuBoard>
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
                                     <CommuBoard2>{result.startLocal}</CommuBoard2>
                                     <CommuBoard2>{result.arriveLocal}</CommuBoard2>
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