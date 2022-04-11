import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Posts from "./Posts";
import ProfilePage from "./ProfilePage";
import styles from "./Home.styles";

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
