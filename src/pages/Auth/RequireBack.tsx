import CookiseServices from "../../services/CookiseServices";
import { Outlet } from "react-router-dom";

export default function RequireBack(): void | JSX.Element {
  const token = CookiseServices.get("jwt");

  return token ? window.history.back() : <Outlet />
}
