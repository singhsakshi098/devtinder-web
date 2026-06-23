import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";



const UserCard = ({ user }) => {
    if (!user) return null;
  const { _id ,firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

   const handleSendRequest = async (status , userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send" +"/" + status + "/" + userId , {} , 
        {withCredentials: true}
      );
      dispatch(removeUserFromFeed(userId));
    }
    catch(err) {
      //error
    }
   }

console.log(user);
  return (
    <div className="card w-96 bg-base-200 shadow-2xl rounded-2xl border border-base-300">
      <figure className="h-96">
       {photoUrl && (
   <img
  src={photoUrl}
  alt="Profile"
  className="w-full h-full object-cover"
  referrerPolicy="no-referrer"
/>
)}
      </figure>

      <div className="card-body">
        <h2 className="card-title text-3xl font-bold">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm opacity-70">
            {age} • {gender}
          </p>
        )}

        <p className="mt-2 text-base leading-6">
          {about}
        </p>

        <div className="divider my-2"></div>

        <div className="card-actions justify-between">
          <button className="btn btn-error w-32"
           onClick = {() => handleSendRequest("ignored" , _id)}>
            Ignore
          </button>

          <button className="btn btn-primary w-32"
            onClick = {() => handleSendRequest("intrested" , _id)}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;