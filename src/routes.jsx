import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Posts from './components/Posts';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute component={Dashboard} adminOnly />} />
      <Route path="/users" element={<PrivateRoute component={Users} adminOnly />} />
      <Route path="/posts" element={<PrivateRoute component={Posts} adminOnly />} />
      <Route path="/posts/:id" element={<PrivateRoute component={PostDetail} adminOnly />} />
      <Route path="/posts/create" element={<PrivateRoute component={CreatePost} adminOnly />} />
    </Routes>
  </Router>
);

export default AppRoutes;
