import PropTypes from "prop-types";
import styled from "styled-components";
import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";
import Icon from '../../components/Icon'

const MobilContainer = styled.div`
    z-index: 10;
`

function MobilityPresenter(props) {
    return (
        <div className="Mobility"> 
            <Sidebar />
                <MobilContainer><Icon /></MobilContainer>
                { props.loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> }
                <Map />
        </div>
    )
}

MobilityPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default MobilityPresenter;