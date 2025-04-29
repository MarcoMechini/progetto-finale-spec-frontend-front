import { Outlet } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";

export default function AppLayout() {
    return (
        <>
            <AppNavbar></AppNavbar>
            <AppSidebar></AppSidebar>
            <Outlet />
        </>
    )
}