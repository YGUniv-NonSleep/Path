import PropTypes from "prop-types";
import styled from "styled-components";

const CommuCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CommuSubCon = styled.div`
    margin-left: 130px;
`;

function CommunityPresenter(props) {
    return (
        <div className="Community">
            <CommuCon>
                <CommuSubCon>
                { props.loading ? <p>커뮤니티 화면 나왔다</p> : <h2>로드 중...</h2> }
                <div>여기다가 쓰면 됨</div>
                    <form onSubmit={props.onSubmit}>
                        <input type="text" placeholder="???" name="name"/>
                        <input type="text" placeholder="???" name="fff"/>
                        <button type="submit">submit</button>
                    </form>
                </CommuSubCon>
            </CommuCon>
        </div>
    )
}

CommunityPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CommunityPresenter;