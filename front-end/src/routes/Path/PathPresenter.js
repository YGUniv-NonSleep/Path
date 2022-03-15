import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Map from "../../Components/Map"

function PathPresenter(props) {
    return (
        <div className="Path">
            { props.loading ? <p>맵 나왔다</p> : <h2>로드 중...</h2> }
            <Link to="/login">
                <button>로그인 화면 이동</button>
            </Link>
            <Map></Map>
        </div>
    )
}

PathPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default PathPresenter;