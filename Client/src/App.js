import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSignMe } from "./redux/slice/authSlice";
import { fetchPosts } from "./redux/slice/postSlice";
import AllPosts from "./pages/AllPosts/AllPosts";
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSignMe())
  })
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path={`/tags/:name`} element={<AllPosts />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
