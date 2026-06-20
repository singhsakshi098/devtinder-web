import { BrowserRouter , Routes , Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Feed";
import Feed from "./Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  

  return (

    <>
    <Provider store = {appStore}> 
    <BrowserRouter baseName = "/">
    <Routes>
      <Route path="/" element={<Body />}>
       <Route index element={<Feed />} />
       <Route path="Login" element={<Login />} />
       <Route path="Profile" element={<Profile />} />
       
      
       </Route>
     
    </Routes>
    </BrowserRouter>
    </Provider>

   
    </>
  )
}

export default App;
