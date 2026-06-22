import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
     user && (
    <div>
     
      <EditProfile />
      
    </div>
  )
  )
}

export default Profile
