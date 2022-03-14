import PropTypes from "prop-types";
import styled from "styled-components";

function CommunityPresenter(props) {
    return (
        <div className="Community">
            { props.loading ? <p>커뮤니티 화면 나왔다</p> : <h2>로드 중...</h2> }
        </div>
    )
}

CommunityPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CommunityPresenter;