import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>no Connections Found</h1>;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender } = connection;

        return (
          <div
            // key={_id}
            className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-6 mb-6"
          >
            <img
              alt={`${firstName} ${lastName}`}
              src={photoUrl}
              className="w-32 h-32 object-cover rounded-full mb-4 md:mb-0 md:mr-6 border"
            />

            <div className="text-left">
              <h2 className="text-xl text-gray-600 font-semibold">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-600">
                Age: {age} | Gender: {gender}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
