import Map from "../../../components/Map";
import MIcon from "../MIcon";
import styled from "styled-components";
import PropTypes from "prop-types";
import useLoading from '../../../hooks/useLoading';
import useBikeIcon from '../hooks/useBikeIcon';

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 380px;
  height: 90px;
`;

const BarContainer = styled.div`
  z-index: 10
  width: 390px;
  height: 90%;
  margin-top: 90px;
`;

const Ul = styled.ul`
  position: fixed;
  top: 10px;
  left: 110px;
`;

function BikeMain() {
  const { loading } = useLoading();
  const {} = useBikeIcon();

  return (
    <div className="Mobility">
      <SideNav>
        <MIcon />

        <BarContainer>
          {/* { loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> } */}
        </BarContainer>
      </SideNav>
      <Map />
    </div>
  );
}

BikeMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default BikeMain;
