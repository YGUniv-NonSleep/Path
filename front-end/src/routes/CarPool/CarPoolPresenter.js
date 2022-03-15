import PropTypes from "prop-types";
import styled from "styled-components";

function CarPoolPresenter(props) {
    return (
        <div className="CarPool">
            { props.loading ? <p>카풀 화면 나왔다</p> : <h2>로드 중...</h2> }
        </div>
    )
}

CarPoolPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CarPoolPresenter;