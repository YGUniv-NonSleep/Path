import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Company from "./Company";
import CompCreate from "./CompCreate";
import CompManage from "./CompManage";
import CompStore from "./CompStore";

function CompanyContainer() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [currLocation, setCurrLocation] = useState(null);

    useEffect(() => {
        setCurrLocation(location.pathname);
    }, [location]);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <Company
            loading={loading}
        >
        </Company>
    )
}

export default CompanyContainer;