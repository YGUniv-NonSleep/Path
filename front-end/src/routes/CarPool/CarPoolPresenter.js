import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from 'react-router-dom' 


const CommuSubCon = styled.div`
  margin-left: 130px;
`;
function CarPoolPresenter(props) {
    return (
        <div className="CarPool">
           <CommuSubCon>
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