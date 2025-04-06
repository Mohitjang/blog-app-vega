import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import LoginPage from "./pages/AuthPages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BlogListPage from "./pages/BlogPages/BlogListPage";
import BlogDetailPage from "./pages/BlogPages/BlogDetailPage";
import CreateBlogPage from "./pages/BlogPages/CreateBlogPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}

        <Route path="/dashboard" element={<BlogListPage />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

        {/* Blog Routes */}
        <Route path="/" element={<BlogListPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/create" element={<CreateBlogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
