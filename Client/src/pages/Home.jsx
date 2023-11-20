import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  fetchTags,
  fetchPopularPosts,
} from "../redux/slice/postSlice";
import dateConverter from "../utils/dateConverter";
import { fetchGetComments } from "../redux/slice/commentSlice";
export const Home = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const { allComments } = useSelector((state) => state.com);
  //pull out posts and tags from postReducer
  const { posts, tags } = useSelector((state) => state.post);
  //pulling out the status for checking if posts are loaded
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  const userData = useSelector((state) => state.auth.data);
  const { postComments } = useSelector((state) => state.com);

  React.useEffect(() => {
    try {
      //calling two requests for getting a posts and tags
      //if you just write the fetchPosts it won`t work cause you need fuction to be called for of make the request
      dispatch(fetchPosts());
      dispatch(fetchTags());
      dispatch(fetchGetComments());
    } catch (error) {
      console.log("failure to get posts", error);
    }
  }, []);
  const handleChangeTabs = (event, newValue) => {
    setActiveTab(newValue);
    // depends on a Tab value it will make related request
    if (newValue === 0) {
      dispatch(fetchPosts());
    } else if (newValue === 1) {
      dispatch(fetchPopularPosts());
    }
  };
  return (
    <>
      <Tabs
        value={activeTab}
        onChange={handleChangeTabs}
        style={{ marginBottom: 15 }}
        aria-label="basic tabs example"
      >
        <Tab label="New" value={0} />
        <Tab label="Popular" value={1} />
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((item) =>
            isPostsLoading ? (
              <Post isLoading={isPostsLoading} />
            ) : (
              <Post
                id={item._id}
                title={item.title}
                imageUrl={
                  item.image ? `http://localhost:4420${item.image}` : ""
                }
                user={item.user}
                createdAt={dateConverter(item.createdAt)}
                viewsCount={item.views}
                commentsCount={postComments.items.length}
                tags={item.tags}
                //comparing post-userId and userId-from-store
                isEditable={Boolean(item.user._id === userData?._id)}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={allComments.items.slice(0, 5)}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
