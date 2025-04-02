import { useEffect, useState } from "react";
import useStore from "../store/useStore";

const TrendingPosts = () => {
  const { posts, loadUserPosts, loadPostComments } = useStore();
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      let maxComments = 0;
      let trending = [];

      for (const post of posts) {
        const comments = await loadPostComments(post.id);
        if (comments.length > maxComments) {
          maxComments = comments.length;
          trending = [post];
        } else if (comments.length === maxComments) {
          trending.push(post);
        }
      }
      setTrendingPosts(trending);
    };

    fetchTrendingPosts();
  }, [posts]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Trending Posts</h2>
      <ul>
        {trendingPosts.map((post) => (
          <li key={post.id}>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;
