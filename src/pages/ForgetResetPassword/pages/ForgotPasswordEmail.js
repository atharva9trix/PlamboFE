import SplitAuthLayout from "../../Login/layouts/SplitAuthLayout";
import LoginHeader from "../../Login/components/LoginHeader";
import ForgotPasswordForm from "../components/ForgetPasswordForm";
import { useForgotPassword } from "../hooks/useForgetPassword";

export default function ForgotPasswordPage() {
  const { handleForgotPassword, error, loading, success } = useForgotPassword();

  return (
    <SplitAuthLayout header={<LoginHeader />}>
      <ForgotPasswordForm
        onSubmit={handleForgotPassword}
        error={error}
        loading={loading}
        success={success}
      />
    </SplitAuthLayout>
  );
}
