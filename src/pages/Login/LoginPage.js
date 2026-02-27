import AuthLayout from "./layouts/AuthLayout";
import LoginHeader from "./components/LoginHeader";
import LoginCard from "./components/LoginCard";
import LoginForm from "./components/LoginForm";
import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
  const { handleLogin, error, loading } =
    useLogin();

  return (
    <AuthLayout header={<LoginHeader />}>
      <LoginCard>
        <LoginForm
          onSubmit={handleLogin}
          error={error}
          loading={loading}
        />
      </LoginCard>
    </AuthLayout>
  );
}