import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        No Connections Found
      </h1>
    );

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        My Connections
      </h1>

      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        } = connection;

        return (
          <div
            key={_id}
            className="flex items-center gap-6 bg-base-200 shadow-md rounded-xl p-5 mb-5"
          >
            <img
              src={photoUrl}
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;