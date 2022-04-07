import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import Map from "../../components/Map";
import SearchCon from "./SearchCon";

function PathPresenter(props) {
  // console.log(props)
  return (
    <div className="Path">
      <SearchCon
        juso={{
          jusoValue: props.jusoValue,
          sp: props.startPoint,
          ap: props.arrivalPoint,
          onchangeSP: props.onchangeSP,
          onchangeAP: props.onchangeAP,
          switchPoints: props.switchPoints,
          refreshPoints: props.refreshPoints,
          wayFind: props.wayFind
        }}
      ></SearchCon>
      {props.loading ? null : <h2>로드 중...</h2>}
      <Map />
    </div>
  );

}

PathPresenter.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PathPresenter;
