import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionSlice";


const Connections = () => {
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try{
      const res = await axios.get(BASE_URL + "/user/connections" , {
        withCredentials: true,


      });
      dispatch(addConnections(res.data.data));

    }catch (err) {
      //Handle error
    }
  }
  
  useEffect(() => {
    fetchConnections()
  }, []);

  return (    
<div className = " flex justify-center my-10">
  <div className = " text-bold text-2xl">
    Connections
  </div>
</div>    
  )
}

export default Connections;
