import {
    BrowserRouter,
    Routes, // v5에서 v6되면서 Switch에서 이름이 Routes로 변경됨.
    Route,
 } from "react-router-dom";
import Home from "../routes/Home"

 function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 속성을 component 대신에 element */}
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
 }

 export default Router;