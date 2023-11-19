import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../../axios.js";
export const AddPost = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const { data } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef(null);
  const isEditing = Boolean(postId);
  // convert image file to the object field with the link
  const handleChangeFile = async (e) => {
    try {
      // create new instance to construct collection of form fields
      const formData = new FormData();
      // pulling out from object file exact the file which user upload
      const file = e.target.files[0];
      // we append form filed to object key/value
      formData.append("image", file);
      // make req to upload the image
      const { data } = await axios.post("/uploads", formData);
      setImageUrl(data.url);
    } catch (error) {
      return console.warn(error);
    }
  };
  //remove image
  const onClickRemoveImage = () => {
    setImageUrl("");
  };
  //this text changer with simple-notes
  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  // submit post to back end ~create new one
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const fileds = {
        title,
        tags,
        image: imageUrl.url,
        text,
      };
      const { data } = isEditing
        ? await axios.patch(`/posts/${postId}`, fileds)
        : await axios.post("/posts", fileds);
      // pull from res _id
      const id = isEditing ? postId : data._id;
      // after with useNavigate navigate user to post which he had already created
      navigate(`/posts/${id}`);
    } catch (error) {
      console.warn(error);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Type text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  useEffect(() => {
    if (postId) {
      axios
        .get(`/posts/${postId}`)
        .then(({ data }) => {
          setTitle(data.title);
          setTags(data.tags.join(" "));
          setImageUrl(data.image);
          setValue(data.text);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, []);

  // if store does`t got user data and token in localStorage, will return user to home-page
  if (!localStorage.getItem("auth-token") && !data) {
    return <Navigate to={"/"} />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Upload preview
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />

      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4420${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title of article..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          style={{ backgroundColor: isEditing ? "#34D399" : "" }}
          onClick={handleSubmit}
          size="large"
          variant="contained"
        >
          {isEditing ? "Save" : "Publish"}
        </Button>
        <Link to="/">
          <Button size="large" style={{ color: "red" }}>
            Cancel
          </Button>
        </Link>
      </div>
    </Paper>
  );
};
