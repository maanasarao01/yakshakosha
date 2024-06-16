import Search from "./homePage";
//style={{ paddingLeft:"520px", paddingRight:"520px", paddingTop:"60px"}}
function App() {
  return (
    <div className="App">
      <img src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt="logo"className="logo" />
      <h1 style={{paddingLeft:"550px",paddingRight:"550px"}}>YakshaKosha</h1>
      <Search/>
    </div>
  );
}

export default App;
