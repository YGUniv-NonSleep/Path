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
    // console.log(props)
    return (
        <div className="Oder">
            <OderCon>
                <OderSubCon>
                { props.loading ? <p>오더 화면 나왔다</p> : <h2>로드 중...</h2> }
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