//import React from "react";
import Router from "./Router";
import GlobalStyles from "./GlobalStyles"

// https://www.w3schools.com/css/css_website_layout.asp 
// https://tech.devsisters.com/posts/react-extend-theme/
// https://www.daleseo.com/material-ui-styles/
// https://v3.mui.com/getting-started/page-layout-examples/
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Router />
    </div>
  );
}

export default App;
