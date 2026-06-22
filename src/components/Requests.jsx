import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest , removeRequest } from "../utils/requestSlice";
import { useEffect , useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [showButtons , setShowButtons] = useState();

  const reviewRequest = async (status, _id) =>{
    try{
      const res = await axios.post(BASE_URL + "/request/review/"+ status + "/" + _id, 
        {}, 
        {withCredentials: true}
       );
       dispatch(removeRequest(_id))

    }catch (err) {
      //error
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/recieved",
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      dispatch(addRequest(res.data.connectionRequests));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        No Connections Found
      </h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-8">
       Connection Requests
      </h1>

      {requests.map((request) => {
        console.log(request.fromUserId);
        console.log("Photo URL:", request.fromUserId.photoUrl);

        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        } = request.fromUserId;

        return (
          <div
            key={_id}
            className="flex items-center gap-6 bg-base-200 shadow-md rounded-xl p-5 mb-5"
          >
            <img
              src={
                photoUrl ||
                "https://randomuser.me/api/portraits/lego/1.jpg"
              }
              alt="profile"
              className="w-24 h-24 rounded-full object-cover"
            />

            <div>
              <h2 className="text-xl font-bold">
                {firstName} {lastName}
              </h2>

              {age && gender && (
                <p className="text-gray-500">
                  {age}, {gender}
                </p>
              )}

              <p className="mt-2">{about}</p>
            </div>
            <div className="card-actions justify-center gap-4 mt-4">
  <button
    className="btn btn-outline btn-error px-8 " onClick ={() => reviewRequest("rejected",request._id)}
  >
    Reject
  </button>

  <button
    className="btn btn-primary px-8" onClick ={() => reviewRequest("accepted",request._id)}
  >
    Accepted
  </button>
</div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;