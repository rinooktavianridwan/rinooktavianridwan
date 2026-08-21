import { Navigate, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ToastProvider from "./admin/components/Toast";
import PrivateRoute from "./admin/components/PrivateRoute";
import AdminLayout from "./admin/layout/AdminLayout";
import LoginPage from "./admin/pages/LoginPage";
import ProfilePage from "./admin/pages/ProfilePage";
import ProjectsPage from "./admin/pages/ProjectsPage";
import TechnologiesPage from "./admin/pages/TechnologiesPage";
import ContactsPage from "./admin/pages/ContactsPage";
import Navbar from "./component/Navbar";
import Content from "./page/Content";
import Footer from "./component/Footer";

function PublicSite() {
  return (
    <>
      <Navbar />
      <Content />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<PublicSite />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="projects" replace />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="technologies" element={<TechnologiesPage />} />
              <Route path="contacts" element={<ContactsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;