import React, { useState, useEffect } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import dateConverter from "../utils/dateConverter";
import axios from "../axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostComments } from "../redux/slice/commentSlice";
export const FullPost = () => {
  const dispatch = useDispatch();
  // getting post id from dynamic parameter in routerF
  const { id: postId } = useParams();
  const { postComments } = useSelector((state) => state.com);
  // declarate two states one for storing data second for checking is loaded or not
  const [data, getData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // for the first loaded make the GET req to get post infomation and store it into state also remove the loading
  useEffect(() => {
    try {
      axios.get(`/posts/${postId}`).then((res) => {
        getData(res.data);
        setIsLoading(!isLoading);
        dispatch(fetchPostComments(postId));
      });
    } catch (error) {
      return console.log("faliure to get the post", error);
    }
  }, []);
  // we will returning the loding Post utill it would loaded
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.image ? `http://localhost:4420${data.image}` : ""}
        user={data.user}
        createdAt={dateConverter(data.createdAt)}
        viewsCount={data.views}
        commentsCount={postComments.items.length}
        tags={data.tags}
        isFullPost
      >
        <Markdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[...Array(5)] && postComments.items}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
