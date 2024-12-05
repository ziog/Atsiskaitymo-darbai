import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersList from './pages/Users/UserList';
import UserDetails from './pages/Users/UserDetails';
import CreateUser from './pages/Users/NewUser';
import EditUser from './pages/Users/EditUser';
import DeleteUser from './pages/Users/DeleteUser';
import PostList from './pages/Posts/PostList';
import PostDetails from './pages/Posts/PostDetails';
import NewPost from './pages/Posts/NewPost';
import EditPost from './pages/Posts/EditPost';
import DeletePost from './pages/Posts/DeletePost';


export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <h1>React + API Užduotis</h1>
          <ul>
            <li>
              <Link to="/">Pagrindinis puslapis</Link>
            </li>
            <li>
              <Link to="/users">Vartotojai</Link>
            </li>
            <li>
              <Link to="/users/new">Sukurti vartotoją</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<h2>Sveiki atvykę į React + API užduočių programą</h2>} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetails />}>
            <Route path="posts" element={<PostList />} />
            <Route path="posts/new" element={<NewPost />} />
            <Route path="posts/:postId" element={<PostDetails />} />
            <Route path="posts/:postId/edit" element={<EditPost />} />
            <Route path="posts/:postId/delete" element={<DeletePost />} />
          </Route>
          <Route path="/users/new" element={<CreateUser />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
          <Route path="/users/:id/delete" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
}
