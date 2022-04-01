import {
    BrowserRouter,
    Routes, // v5에서 v6되면서 Switch에서 이름이 Routes로 변경됨.
    Route,
 } from "react-router-dom";

import Path from "../routes/Path"
import Member from "../routes/Member"
import Oder from "../routes/Oder"
import Mobility from "../routes/Mobility";
import Community from "../routes/Community";
import CarPool from "../routes/CarPool";
import Login from "../routes/Member/login";
import SignUp from "../routes/Member/signUp";

import Bus from "../routes/Mobility/Bus";
import Subway from "../routes/Mobility/Subway";

import Menubar from "./Menubar";

// https://kyung-a.tistory.com/36
// https://roylee0704.github.io/react-flexbox-grid/
// https://rsuitejs.com/
// https://www.w3schools.com/css/css_website_layout.asp
// https://tech.devsisters.com/posts/react-extend-theme/

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
                <Route path="/oder" element={<Oder />} />
            </Routes>
            <Routes>
                <Route path="/mobility" element={<Mobility />} />
                <Route path="/mobility/bus" element={<Bus/>} />
                <Route path="/mobility/subway" element={<Subway />} />
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