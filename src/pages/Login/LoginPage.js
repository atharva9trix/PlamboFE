import SplitAuthLayout from "./layouts/SplitAuthLayout";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
  const { handleLogin, error, loading } = useLogin();

  return (
    <SplitAuthLayout header={<LoginHeader />}>
        <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
    </SplitAuthLayout>
  );
}
