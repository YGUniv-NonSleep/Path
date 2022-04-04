import PropTypes from "prop-types";
import styled from "styled-components";
import Map from "../../../components/Map";
import Bus from "./Bus";

function BusPresenter(props) {
    return (
        <div className="Mobility"> 
        <Bus />
            { props.loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> }
            <Map />
        </div>
    )
}

BusPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default BusPresenter;