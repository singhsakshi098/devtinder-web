import { BrowserRouter , Routes , Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";


function App() {
  

  return (

    <>
    <BrowserRouter baseName = "/">
    <Routes>
      <Route path="/" element={<Body />}>
       <Route path="Login" element={<Login />} />
      
       </Route>
     
    </Routes>
    </BrowserRouter>

   
    </>
  )
}

export default App
