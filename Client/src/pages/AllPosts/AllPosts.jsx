import React, { useEffect } from "react";
import { Post } from "../../components/Post";
import styles from "./AllPosts.module.scss";
import dateConverter from "../../utils/dateConverter";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/slice/postSlice";
import { useParams } from "react-router-dom";
export default function AllPosts() {
  const { posts } = useSelector((state) => state.post);
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const tagName = useParams();
  const isLoading = posts.status === "loading";
  useEffect(() => {
    try {
      dispatch(fetchPosts());
    } catch (error) {
      console.warn(error);
    }
  }, []);
  const fulteredPosts = Array.isArray(posts?.items)
    ? posts.items.filter((item) => item.tags.includes(tagName.name))
    : [];
  return (
    <div className={styles.container}>
      {(isLoading ? [...Array(5)] : fulteredPosts).map((item) =>
        isLoading ? (
          <Post isLoading={isLoading} />
        ) : (
          <Post
            id={item._id}
            title={item.title}
            user={item.user}
            createdAt={dateConverter(item.createdAt)}
            viewsCount={item.views}
            commentsCount={3}
            tags={item.tags}
            isEditable={Boolean(item.user._id === userData?._id)}
          />
        )
      )}
    </div>
  );
}
