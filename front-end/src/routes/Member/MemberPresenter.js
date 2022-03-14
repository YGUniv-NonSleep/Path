import PropTypes from "prop-types";
import styled from "styled-components";

function MemberPresenter(props) {
    return (
        <div className="Member">
            { props.loading ? <p>맴버 화면 나왔다</p> : <h2>로드 중...</h2> }
        </div>
    )
}

MemberPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default MemberPresenter;