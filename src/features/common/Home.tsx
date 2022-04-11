import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import ProfilePage from "../profiles/ProfilePage";
import styles from "./Home.styles";
import Posts from "../posts/Posts";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <>
      <div className="min-h-full">
        {/* TODO: When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
        <Header />
        <div className="py-10">
          <div className={styles.container}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/profiles/:id" element={<ProfilePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Posts />} />
            </Routes>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
