import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine, RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from "../../hooks/auth";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  const { signOut } = useAuth();

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiContactsLine} href="/legislation">Código Penal</NavLink>
      </NavSection>
      <NavSection title="">
        <NavLink icon={RiLogoutBoxLine} onClick={signOut} href="#">Sair</NavLink>
      </NavSection>
    </Stack>
  )
}