import { Navigate, Outlet } from "react-router-dom";

export function LoginAuthGuard(props: { authToken: string | null}) {
  if (props.authToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}