import Router from "./Router";
import GlobalStyles from "./GlobalStyles"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
`;
// https://www.w3schools.com/css/css_website_layout.asp 
// https://tech.devsisters.com/posts/react-extend-theme/
// https://www.daleseo.com/material-ui-styles/
// https://v3.mui.com/getting-started/page-layout-examples/
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Container>
        <Router />
      </Container>
    </div>
  );
}

export default App;
