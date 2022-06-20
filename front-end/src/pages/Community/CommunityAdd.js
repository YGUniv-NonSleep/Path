import PropTypes from "prop-types";
// import styled from "styled-components";
import useBoardAdd from "./hooks/useBoardAdd";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

// const CommuCon = styled.div`
//   width: 390px;
//   height: 100%;
// `;
// const CommuSubCon = styled.div`
//   margin-left: 130px;
// `;
// const CommuBoard = styled.th`
//   border: 1px solid black;
// `;
// const CommuBoard2 = styled.td`
//   border: 1px solid black;
// `;
// const NullCommuBoard = styled.td`
//   border: 1px solid black;
//   text-align: center;
// `;


const type = [
  {
    value: 'NOTICE',
    label: 'NOTICE',
  },
  {
    value: 'QNA',
    label: 'QNA',
  },
  {
    value: 'COMPLAINT',
    label: 'COMPLAINT',
  },
  {
    value: 'FAQ',
    label: 'FAQ',
  },
]


function CommunityAdd(){
    const { subAdd, commuSubmit } = useBoardAdd();
    const [currency, setCurrency] = React.useState('NOTICE');

    const handleChange = (e) => {
      setCurrency(e.target.value);
    };

    return(
      <>
     <React.Fragment>
      <Container maxWidth="xs" align="center">
        <Box sx={{ bgcolor: 'white', height: '100vh'}}>
        <Typography
                component="h4"
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
                fontWeight={'normal'}>
                  게시글 등록
        </Typography><br></br><br></br>
        <form
           id="myForm"
           name="myForm"
           onSubmit={commuSubmit}
          encType="multipart/form-data">

        <TextField
          id="standard-multiline-flexible"
          name="title"
          label="제목"
          multiline
          maxRows={4}
          variant="standard"
          placeholder="제목을 입력하세요"
        /><br></br><br></br><br></br><br></br>
        <TextField
          id="outlined-multiline-static"
          label="내용"
          name="content"
          multiline
          rows={4}
          placeholder="내용을 입력하세요"
        /><br></br><br></br><br></br><br></br>
          <TextField
          id="outlined-select-currency"
          select
          label="Select"
          name="type"
          value={currency}
          onChange={handleChange}
          helperText="게시글 타입을 선택해주세요"
        >
          {type.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br><br></br><br></br><br></br>   
        <Button
          variant="contained"
          component="label">
        <Typography>
          파일등록
        </Typography>
        <input id={"file-input"} style={{ display: 'none' }} type="file" name="userfile" multiple="multiple"  />
        </Button>
        <br></br><br></br><br></br><br></br>
        <Button type="submit">등록</Button>
      </form>
      
        </Box>
      </Container>
    </React.Fragment>
    </> 

    //</Box>

    // <div className="CommunityAdds">
    //      <CommuCon>
    //          <CommuSubCon>
    //             <form
    //             id="myForm"
    //             name="myForm"
    //             onSubmit={commuSubmit}
    //             encType="multipart/form-data"
    //             >
    //               <input type="text" placeholder="제목을 입력하세요" name="title" />
    //               <input type="text" placeholder="내용을 입력하세요" name="content" />
    //               <select type="text" placeholder="type" name="type" >
    //                   <option>NOTICE</option>
    //                   <option>FAQ</option>
    //                   <option>COMPLAINT</option>
    //                   <option>QNA</option>
    //               </select>
    //               <input type="file" name="userfile" multiple="multiple" />
    //               <button type="submit">submit</button>
    //             </form>
    //          </CommuSubCon>
    //      </CommuCon>
    //  </div>
    );
}

export default CommunityAdd;