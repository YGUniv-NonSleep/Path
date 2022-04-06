import {
    BrowserRouter,
    Routes, // v5에서 v6되면서 Switch에서 이름이 Routes로 변경됨.
    Route
 } from "react-router-dom";

import Path from "../routes/Path"
import Member from "../routes/Member"
import Oder from "../routes/Oder"
import Mobility from "../routes/Mobility";
import Community from "../routes/Community";
import CarPool from "../routes/CarPool";
import Login from "../routes/Member/login";
import SignUp from "../routes/Member/signUp";

import Company from "../routes/Member/Company";
import CompStore from "../routes/Member/Company/CompStore";
import CompCreate from "../routes/Member/Company/CompCreate";
import CompManage from "../routes/Member/Company/CompManage";

import Bus from "../routes/Mobility/Bus";
import Subway from "../routes/Mobility/Subway";
import Scooter from "../routes/Mobility/Scooter";
import Bike from "../routes/Mobility/Bike";


import Menubar from "./Menubar";

// https://kyung-a.tistory.com/36

 function Router() {
    return (
        <BrowserRouter>
            <Menubar></Menubar>
            
            <Routes>
                {/* 속성을 component 대신에 element */}
                <Route path="/" element={<Path />} />
            </Routes>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/member" element={<Member />} />
            </Routes>
            <Routes>
                <Route path="/company" element={<Company />} />
                <Route path="/company/store" element={<CompStore />}>
                    <Route path=":comId" element={<CompStore />} />
                </Route>
                <Route path="/company/create" element={<CompCreate />} />
                <Route path="/company/manage" element={<CompManage />}>
                    <Route path=":comId" element={<CompStore />}>
                        <Route index path="items" element={<CompManage />} />
                        <Route path="item-edit" element={<CompManage />} />
                        <Route path="info-edit" element={<CompManage />} />
                        <Route path="resign" element={<CompManage />} />
                    </Route>
                </Route>
            </Routes>
            <Routes>
                <Route path="/oder" element={<Oder />} />
            </Routes>
            <Routes>
                <Route path="/mobility" element={<Mobility />} />
                <Route path="/mobility/bus" element={<Bus/>} />
                <Route path="/mobility/subway" element={<Subway />} />
                <Route path="/mobility/scooter" element={<Scooter />} />
                <Route path="/mobility/bike" element={<Bike />} />
            </Routes>
            <Routes>
                <Route path="/community" element={<Community />} />
            </Routes>
            <Routes>
                <Route path="/carpool" element={<CarPool />} />
            </Routes>
        </BrowserRouter>
    )
 }

 export default Router;