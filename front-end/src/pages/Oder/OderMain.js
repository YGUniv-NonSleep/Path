import { useEffect, useState } from "react";
import Map from "../../components/Map";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useLoading from '../../hooks/useLoading';
import useOderMain from './hooks/useOderMain';

import { SideNav, OderCon, OderSubCon } from './styles/oderStyle'

function OderMain() {
    const { loading } = useLoading()

    return (
        <div className="Oder">
            <SideNav>
                { loading ? null : <h2>로드 중...</h2> }
            </SideNav>
            <Map />
        </div>
    )
}

OderMain.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};
export default OderMain;
