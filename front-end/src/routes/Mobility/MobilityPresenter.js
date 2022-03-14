import PropTypes from "prop-types";
import styled from "styled-components";

function MobilityPresenter(props) {
    return (
        <div className="Mobility">
            { props.loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> }
        </div>
    )
}

MobilityPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default MobilityPresenter;