import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });
      // console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;

  if(feed.length <= 0) return <h1>No more user found </h1>
  return (
    feed && (
      <div className="flex justify-center mt-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
