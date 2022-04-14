import PropTypes from "prop-types";
import styled from "styled-components";
import Map from "../../../components/Map";
import Bus from "./Bus";

function BusPresenter(props) {
    return (
        <div className="Mobility"> 
        <Bus busNo={props.busNo} busStay={props.busStay} onChange={props.onChanged} submit={props.submit}/>
        <Map />
        
            { props.loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> }
          
        </div>
    )
}

BusPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default BusPresenter;