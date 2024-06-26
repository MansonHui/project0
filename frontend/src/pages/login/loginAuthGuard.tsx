import { Navigate, Outlet } from "react-router-dom";

export function LoginAuthGuard(props: { authToken: string | null}) {
  console.log("authGurad")
  if (props.authToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/HomePage" />;
  }
}