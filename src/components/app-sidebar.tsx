import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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
import { useEffect, useState } from "react";
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
    title: "Tu espacio",
    url: "/barber-panel",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const registerMutation = useRegister();
  const { isAuthenticated, user, logout } = useAuth();

  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [location.pathname, isMobile, setOpenMobile]);

  const handleLogut = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    if (!isAuthenticated) {
      setActiveModal("login");
    } else {
      navigate("/profile");
    }
  };

  const isBarber = user?.role === "barber";

  return (
    <>
      <Sidebar className="dark bg-ink text-white">
        <SidebarHeader>
          <div className="space-y-2 px-2 py-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-sm bg-brass text-ink">
                <Scissors size={23} />
              </div>
              <h2 className="font-heading text-xl font-semibold tracking-[0.12em] text-bone">
                KLIP
              </h2>
            </div>
            <p className="pl-1 text-[10px] tracking-[0.28em] text-neutral-500">
              ESTUDIO DE BARBERÍA
            </p>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <nav aria-label="Navegación principal">
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
                          render={
                            <Link
                              to={item.url}
                              aria-current={isActive ? "page" : undefined}
                              onClick={() => {
                                if (isMobile) {
                                  setOpenMobile(false);
                                }
                              }}
                            />
                          }
                          className={`
                h-11 w-full rounded-lg
                transition-all duration-300 ease-in-out
                hover:translate-x-1
                ${
                  isActive
                    ? "bg-pine-soft text-brass ring-1 ring-brass/20 hover:bg-pine-soft hover:text-brass-light"
                    : "text-muted-foreground hover:bg-pine-soft/70 hover:text-brass-light"
                }
              `}
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
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            </SidebarGroup>
          </nav>
        </SidebarContent>

        <SidebarFooter>
          <Button
            size="lg"
            className="bg-brass text-ink hover:bg-brass-light"
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
