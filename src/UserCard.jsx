import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, skills, emailId } =
    user;

  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = axios.post(
        "http://localhost:3000/request/send" + "/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(user);
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}

        <div className="card-actions justify-end flex">
          <button
            onClick={() => {
              handleSendRequest("ignore", _id);
            }}
            className="btn btn-primary"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              handleSendRequest("interested", _id);
            }}
            className="btn btn-primary"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
