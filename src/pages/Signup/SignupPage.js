import SplitAuthLayout from "../Login/layouts/SplitAuthLayout";
import SignupHeader from "./components/SignupHeader";
import SignupForm from "./components/SignupForm";
import { useSignup } from "./hooks/useSignup";

export default function SignupPage() {
  const { handleSignup, error, loading } = useSignup();

  return (
    <SplitAuthLayout header={<SignupHeader />}>
        <SignupForm onSubmit={handleSignup} error={error} loading={loading} />
    </SplitAuthLayout>
  );
}
