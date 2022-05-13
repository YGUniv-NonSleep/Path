import PropTypes from "prop-types";
import styled from "styled-components";
import Map from "../../../components/Map";
import Scooter from "./Scooter";

function SPresenter(props) {
    return (
        <div className="Mobility"> 
            <Scooter />
            <Map />
            { props.loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> }
                
        </div>
    )
}

SPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default SPresenter;