import PropTypes from "prop-types";
import Map from "../../../components/Map";
import Bike from "./Bike";

function BikePresenter(props) {
    return (
        <div className="Mobility"> 
        <Bike/>
        <Map />
            { props.loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> }
            
        </div>
    )
}

BikePresenter.propTsypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default BikePresenter;