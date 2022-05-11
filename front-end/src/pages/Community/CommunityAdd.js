import PropTypes from "prop-types";
import styled from "styled-components";
import useBoardAdd from "./hooks/useBoardAdd";

const CommuCon = styled.div`
  width: 390px;
  height: 100%;
`;
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

function CommunityAdd(){
    const { subAdd, commuSubmit } = useBoardAdd();

    return(
    <div className="CommunityAdds">
         <CommuCon>
             <CommuSubCon>
                <form
                id="myForm"
                name="myForm"
                onSubmit={commuSubmit}
                encType="multipart/form-data"
                >
                  <input type="text" placeholder="제목을 입력하세요" name="title" />
                  <input type="text" placeholder="내용을 입력하세요" name="content" />
                  <select type="text" placeholder="type" name="type" >
                      <option>NOTICE</option>
                      <option>FAQ</option>
                      <option>COMPLAINT</option>
                      <option>QNA</option>
                  </select>
                  <input type="file" name="userfile" multiple="multiple" />
                  <button type="submit">submit</button>
                </form>
             </CommuSubCon>
         </CommuCon>
     </div>
    );
}

export default CommunityAdd;