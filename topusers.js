import { useEffect, useState } from "react";
import useStore from "../store/useStore";

const TopUsers = () => {
  const { users, loadUsers, loadUserPosts } = useStore();
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const fetchUserPostsCount = async () => {
      const counts = {};
      for (const userId in users) {
        const posts = await loadUserPosts(userId);
        counts[userId] = posts.length;
      }
      const sortedUsers = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      setTopUsers(sortedUsers);
    };
    fetchUserPostsCount();
  }, [users]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Top Users</h2>
      <ul>
        {topUsers.map(([id, count]) => (
          <li key={id}>
            {users[id]} - {count} Posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
