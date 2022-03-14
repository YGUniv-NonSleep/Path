import PropTypes from "prop-types";
import styled from "styled-components";

function OderPresenter(props) {
    return (
        <div className="Oder">
            { props.loading ? <p>오더 화면 나왔다</p> : <h2>로드 중...</h2> }
        </div>
    )
}

OderPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default OderPresenter;