import { validateCredentials } from "../data/validation.server";
import AuthForm from "../views/auth-page/auth-form/AuthForm";
import { login, signup } from "../data/auth.server";
import { ActionFunctionArgs } from "@remix-run/node";

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const redirectPath = searchParams.get("redirectPath") || "/";

  const formData = await request.formData();

  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login({ ...credentials, redirectPath });
    } else {
      return await signup({ ...credentials, redirectPath });
    }
  } catch (error) {
    console.log(error);

    return error;
  }
}
