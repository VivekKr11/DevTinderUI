import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "./utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id ) => {
    try {
      const res =  axios.post(
        "http://localhost:3000/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(_id)
      console.log(status)
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/requests/received",
        { withCredentials: true }
      );
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1> no req</h1>;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        Requests
      </h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="bg-white shadow-lg rounded-xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between border hover:shadow-xl transition"
          >
            <div className="flex items-center w-full md:w-auto">
              <img
                alt={`${firstName} ${lastName}`}
                src={photoUrl}
                className="w-24 h-24 rounded-full object-cover border mr-6"
              />

              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-600">
                  Age: {age} | Gender: {gender}
                </p>
              </div>
            </div>

            <div className="flex mt-4 md:mt-0 md:ml-6 space-x-3">
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Accept
              </button>
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
