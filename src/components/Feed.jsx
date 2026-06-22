import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch , useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import  UserCard from "./UserCard";


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch()
  

  const getFeed = async () => {
    if(feed) return;
    
    try{const res = await axios.get(BASE_URL + "/user/feed" , 
      {withCredentials: true});
      console.log("Feed Response:", res.data);
    dispatch(addFeed(res.data));}
    catch (err) {
      //to do error
       console.log(err);
  console.log(err.response?.status);
  console.log(err.response?.data);
    }

  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed &&  (
    <div className ="flex justify-center my-10">
        <UserCard user={feed[0]} />
      
    </div>
    )
  );
};

export default Feed
