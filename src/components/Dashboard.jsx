import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/users">Manage Users</Link>
          </li>
          <li>
            <Link to="/posts">Manage Posts</Link>
          </li>
          <li>
            <Link to="/posts/create">Create Post</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
