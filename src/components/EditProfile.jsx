import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import {  useSelector } from "react-redux";

const EditProfile = () => {
  const user = useSelector((store) => store.user);  // ← add

  const [firstName, setFirstName] = useState(user?.firstName || "");   // ← change
  const [lastName, setLastName] = useState(user?.lastName || "");      // ← change
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");      // ← change
  const [age, setAge] = useState(user?.age || "");                     // ← change
  const [gender, setGender] = useState(user?.gender || "");            // ← change
  const [about, setAbout] = useState(user?.about || "");               // ← change
  const [skills, setSkills] = useState(user?.skills || "");            // ← change
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start gap-10 py-10 px-6">

      {/* Edit Profile Form */}
      <div className="card w-full max-w-xl bg-base-100 shadow-2xl rounded-2xl border border-base-300">
        <div className="card-body">

          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Edit Profile
          </h2>

          {/* First Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                First Name
              </span>
            </label>

            <input
              type="text"
              placeholder="Enter First Name"
              className="input input-bordered input-primary w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium">
                Last Name
              </span>
            </label>

            <input
              type="text"
              placeholder="Enter Last Name"
              className="input input-bordered input-primary w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Photo URL */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium">
                Photo URL
              </span>
            </label>

            <input
              type="text"
              placeholder="Enter Photo URL"
              className="input input-bordered input-primary w-full"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium">
                Age
              </span>
            </label>

            <input
              type="number"
              placeholder="Enter Age"
              className="input input-bordered input-primary w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium">
                Gender
              </span>
            </label>

            <select
              className="select select-bordered select-primary w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* About */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium">
                About
              </span>
            </label>

            <textarea
              className="textarea textarea-bordered textarea-primary h-28"
              placeholder="Write something about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>

          {/* Skills */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium">
                Skills
              </span>
            </label>

            <input
              type="text"
              placeholder="React, Node.js, MongoDB"
              className="input input-bordered input-primary w-full"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-center mt-4">
              {error}
            </p>
          )}

          {/* Save Button */}
          <div className="card-actions justify-center mt-8">
            <button
              className="btn btn-primary btn-wide"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>

        </div>
      </div>

      {/* Live Preview Card */}
      <div className="sticky top-10">
        <UserCard
          user={{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          }}
        />
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditProfile;