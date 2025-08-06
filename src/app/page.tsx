import { Typewriter } from "react-simple-typewriter";
import ShootingStar from "../components/ShootingStar";
import BackgroundStars from "../components/BackgroundStars";
import { getSortedPostsData } from '../../lib/posts';
import ClientHome from '../components/ClientHome';

export default function Home() {
  const allPostsData = getSortedPostsData();
  
  return <ClientHome allPostsData={allPostsData} />;
}