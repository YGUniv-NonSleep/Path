import {
    BrowserRouter,
    Routes, // v5에서 v6되면서 Switch에서 이름이 Routes로 변경됨.
    Route,
 } from "react-router-dom";
import Path from "../Routes/Path"
import Member from "../Routes/Member"
import Oder from "../Routes/Oder"
import Mobility from "../Routes/Mobility";
import Community from "../Routes/Community";
import CarPool from "../Routes/CarPool";

 function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 속성을 component 대신에 element */}
                <Route path="/" element={<Path />} />
            </Routes>
            <Routes>
                <Route path="/member" element={<Member />} />
            </Routes>
            <Routes>
                <Route path="/oder" element={<Oder />} />
            </Routes>
            <Routes>
                <Route path="/mobility" element={<Mobility />} />
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