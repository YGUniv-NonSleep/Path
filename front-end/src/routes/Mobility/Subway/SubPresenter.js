import PropTypes from "prop-types";
import Map from "../../../components/Map";
import Subway from "./Subway";

function SubPresenter(props) {
    return (
        <div className="Mobility"> 
        <Subway/>
            { props.loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> }
            <Map />
        </div>
    )
}

SubPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default SubPresenter;