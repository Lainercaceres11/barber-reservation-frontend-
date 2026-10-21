import { BrowserRouter, Routes, Route } from "react-router";
import type { ComponentType } from "react";
import Layout from "@/layouts/app-layout";
import Home from "@/pages/home";
import Services from "@/pages/services";
import NotFound from "@/pages/404";
import Footer from "@/components/footer";
import Books from "@/pages/books";
import BarberDashboard from "@/pages/barber-dashboard";
import Appointments from "@/pages/appointments";
import Profile from "@/pages/profile";

const AppointmentsPage = Appointments as unknown as ComponentType;
const ProfilePage = Profile as unknown as ComponentType;

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/books" element={<Books />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/barber-panel" element={<BarberDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
