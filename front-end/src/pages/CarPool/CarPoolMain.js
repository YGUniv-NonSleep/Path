import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from "../../hooks/useLoading";
import useCarPoolPost from "./hooks/useCarPoolPost";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const CommuCon = styled.div`
  width: 100%;
  height: 100%;
`;

const CommuSubCon = styled.div`
  margin-left: 95px;
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

function CarPoolMain() {
  const { loading } = useLoading();
  const {
    viewset, getView
  } = useCarPoolPost();

  return (
  <CommuCon>
  <CommuSubCon>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>게시글 번호</TableCell>
          <TableCell align="right">제목</TableCell>
          <TableCell align="right">출발지역</TableCell>
          <TableCell align="right">도착지역</TableCell>
          <TableCell align="right">희망 탑승인원</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(viewset == null) | (viewset == "") ? (
            <TableRow>
              <NullCommuBoard colSpan={6}>게시글 없음</NullCommuBoard>
            </TableRow>
          ) : (
            viewset.map((result,index) => {
              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{index+1}</TableCell>
                  <TableCell align="right">
                    <Link to={{ pathname: `/carpool/${result.id}` }}>
                      {result.title}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{result.startLocal1}</TableCell>
                  <TableCell align="right">{result.arriveLocal1}</TableCell>
                  <TableCell align="right">{result.recruit}</TableCell>
                </TableRow>
              );
            })
          )}
      </TableBody>
    </Table>
  </TableContainer>
     <Button>
         <Link to={{ pathname: "/carpool/add" }}>등록하기</Link>
     </Button>
</CommuSubCon>
</CommuCon>

    // <div className="CarPool">
    //   <CommuSubCon>
    //     <table>
    //       <tr>
    //         <CommuBoard>게시글번호</CommuBoard>
    //         <CommuBoard>제목</CommuBoard>
    //         <CommuBoard>출발지역</CommuBoard>
    //         <CommuBoard>도착지역</CommuBoard>
    //         <CommuBoard>탑승인원</CommuBoard>
    //       </tr>
    //       {(viewset == null) | (viewset == "") ? (
    //         <tr>
    //           <NullCommuBoard colSpan={6}>게시글 없음</NullCommuBoard>
    //         </tr>
    //       ) : (
    //         viewset.map((result) => {
    //           return (
    //             <tr key={result.id}>
    //               <CommuBoard2>{result.id}</CommuBoard2>
    //               <CommuBoard2>
    //                 <Link to={{ pathname: `/carpool/${result.id}` }}>
    //                   {result.title}
    //                 </Link>
    //               </CommuBoard2>
    //               <CommuBoard2>{result.startLocal1}</CommuBoard2>
    //               <CommuBoard2>{result.arriveLocal1}</CommuBoard2>
    //               <CommuBoard2>{result.recruit}</CommuBoard2>
    //             </tr>
    //           );
    //         })
    //       )}
    //     </table>
    //     <button>
    //       <Link to={{ pathname: "/carpool/add" }}>등록하기</Link>
    //     </button>
    //   </CommuSubCon>
    // </div>
  );
}

CarPoolMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CarPoolMain;