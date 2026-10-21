import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@/layouts/app-layout";
import Home from "@/pages/home";
import Services from "@/pages/services";
import NotFound from "@/pages/404";
import Footer from "@/components/footer";
import Appoitments from "@/pages/appointments";
import Books from "@/pages/books";
import Profile from "@/pages/profile";
import BarberDashboard from "@/pages/barber-dashboard";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/books" element={<Books />} />
          <Route path="/appointments" element={<Appoitments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/barber-panel" element={<BarberDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
