import PropTypes from "prop-types";
import styled from "styled-components";
import MIcon from "../MIcon";
import Map from "../../../components/Map";
import useLoading from '../../../hooks/useLoading';
import useScooterIcon from '../hooks/useScooterIcon';
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
  z-index: 5;
  width: 390px;
  height: 90%;
  margin-top: 90px;
`;

function ScooterMain() {
  const { loading } = useLoading();
  const {} = useScooterIcon();

  return (
    <div className="Mobility">
      <SideNav>
        <BarContainer>
          <MIcon />
        </BarContainer>
      </SideNav>
      <Map />
    </div>
  );
}

ScooterMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ScooterMain;
