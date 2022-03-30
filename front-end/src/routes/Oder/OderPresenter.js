import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";

const OderCon = styled.div`
    width: 390px;
    height: 100%;
`;

const OderSubCon = styled.div`
    margin-left: 130px;
`;

function OderPresenter(props) {
    console.log(props)

    const test = (event) => {
        event.preventDefault();
        axios.get(
            process.env.REACT_APP_SPRING_API+"/api/company/1"
            //"https://localhost:8080/api/company/1"
            )
            .then((res) => {
                console.log(res);        
          }).catch((err) => {
                console.log(err);            
          });
      };

      const createCompany = (e) =>{
          e.preventDefault();
//          const data = new FormData(e.currentTarget);
        
          console.log(e.target.name.value + "as")
          const jsonData = {
              name: "1"

          }
          axios.post(
            process.env.REACT_APP_SPRING_API+"/api/createCompany", jsonData
          ).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          })
      }
    
    return (
        <div className="Oder">
            <OderCon>
                <OderSubCon>
                { props.loading ? <p>오더 화면 나왔다</p> : <h2>로드 중...</h2> }
                <div>여기다가 쓰면 됨</div>
                <button onClick={test} >Test</button>
                <button id="companyInfo" >업체정보</button>
                <button id="orderList" >주문목록</button>
                    <form onSubmit={props.onSubmit}>
                        <input type="text" placeholder="업체명" name="name"/>
                        <input type="text" placeholder="사업자등록번호" name="crn"/>
                        <input type="date" placeholder="개업일자" name="openDate"/>
                        <input type="text" placeholder="카테고리" name="category"/>
                        <input type="text" placeholder="이메일" name="email"/>
                        <input type="text" placeholder="전화번호" name="phone"/>
                        <input type="text" placeholder="위도" name="lat"/>
                        <input type="text" placeholder="경도" name="long"/>
                        <button type="submit">업체등록</button>
                    </form>

                    <h1>{props.res} asfds</h1>
                </OderSubCon>
            </OderCon>            
        </div>
    )
}

OderPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default OderPresenter;