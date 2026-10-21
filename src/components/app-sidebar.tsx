import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import LoginForm from "@/components/login";
import {
  BookOpenCheck,
  ClipboardClock,
  Home,
  Scissors,
  SquarePen,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";
import RegisterForm, { type RegisterFormData } from "./register";
import useRegister from "@/hooks/mutation/auth/use-register";

type ActiveModal = "login" | "register" | null;

const menuItems = [
  {
    icon: <Home />,
    title: "Inicio",
    url: "/",
  },

  {
    icon: <Scissors />,

    title: "Servicios",
    url: "/services",
  },
  {
    icon: <BookOpenCheck />,

    title: "Agendar citas",
    url: "/books",
  },

  {
    icon: <ClipboardClock />,
    title: "Citas",
    url: "/appointments",
  },

  {
    icon: <User />,
    title: "Perfil",
    url: "/profile",
  },
  {
    icon: <SquarePen />,
    title: "Tú espacio",
    url: "/barber-panel",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const registerMutation = useRegister();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogut = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    if (!isAuthenticated) {
      setActiveModal("login");
    }
    navigate("/");
  };

  const isBarber = user?.role === "barber";

  return (
    <>
      <Sidebar className="dark">
        <SidebarHeader>
          <div className="px-2 py-3 space-y-2">
            <div className="flex gap-4 items-center">
              <div className="flex size-11 items-center justify-center rounded-lg bg-yellow-400 text-black">
                <Scissors size={23} />
              </div>
              <h2 className="text-lg font-extrabold tracking-wider">KLIP</h2>
            </div>
            <p className="text-xs tracking-[0.3em] text-yellow-400">
              BARBERSHOP
            </p>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="flex flex-col gap-2">
              {menuItems
                .filter((item) => {
                  if (item.url === "/barber-panel") {
                    return isBarber;
                  }

                  if (item.url === "/appointments") {
                    return user?.role === "customer";
                  }

                  if (item.url === "/books") {
                    return user?.role === "customer";
                  }

                  return true;
                })
                .map((item) => {
                  const isActive = location.pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        isActive={isActive}
                        className={`
                h-11 w-full rounded-lg
                transition-all duration-300 ease-in-out
                hover:translate-x-1
                ${
                  isActive
                    ? "bg-[#27241a] text-yellow-400 shadow-sm ring-1 ring-yellow-400/20 hover:bg-[#27241a] hover:text-yellow-300"
                    : "text-muted-foreground hover:bg-[#27241a]/70 hover:text-yellow-300"
                }
              `}
                      >
                        <Link
                          to={item.url}
                          className="relative flex h-full w-full items-center gap-3 px-3"
                        >
                          {isActive && (
                            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-yellow-400" />
                          )}

                          <span
                            className={`transition-transform duration-300 ${
                              isActive ? "scale-110" : ""
                            }`}
                          >
                            {item.icon}
                          </span>

                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <Button
            size="lg"
            className="bg-yellow-500 text-black hover:bg-yellow-400"
            onClick={handleLogin}
          >
            {isAuthenticated ? (user?.name ?? "Mi cuenta") : "Iniciar sesión"}
          </Button>

          {isAuthenticated && (
            <Button
              className="text-white"
              variant="outline"
              onClick={handleLogut}
            >
              Cerrar sesión
            </Button>
          )}
        </SidebarFooter>
      </Sidebar>

      <LoginForm
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal(null)}
        onRegisterClick={() => setActiveModal("register")}
      />

      <RegisterForm
        open={activeModal === "register"}
        onClose={() => setActiveModal(null)}
        onLoginClick={() => setActiveModal("login")}
        onSubmitRegister={async (formData: RegisterFormData) => {
          await registerMutation.mutateAsync({
            ...formData,
            phone: formData.phone?.trim() || undefined,
          });

          setActiveModal("login");
        }}
      />
    </>
  );
}
