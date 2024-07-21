import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import Button from "~/components/button/Button";
import LockIcon from "~/images/lock.svg";
import UserIcon from "~/images/add-user.svg";

import styles from "~/views/wallet-page/expense-form/ExpenseForm.module.css";

interface ValidationDataType {
  email?: string;
  password?: string;
}

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const validationErrors = useActionData() as ValidationDataType;

  const authMode = searchParams.get("mode");
  const isLoginMode = authMode === "login";

  return (
    <div className="my-12 flex w-full items-center justify-center px-10 lg:my-20">
      <div className="flex w-full max-w-[30rem] flex-col items-center justify-center rounded-xl border-2 border-primary px-10 pb-4 pt-8">
        <div className="mb-3 w-10 lg:w-16">
          <img
            src={isLoginMode ? LockIcon : UserIcon}
            alt="lock icon"
            className="h-auto w-full"
          />
        </div>
        <div className="mb-6 text-xl font-bold lg:mb-14 lg:text-3xl">
          {isLoginMode ? "Login" : "Register"}
        </div>
        <Form
          method="post"
          className="flex w-full flex-col items-center justify-center"
        >
          <div className="mb-5 flex w-full flex-col gap-5 text-lg lg:mb-10">
            <div className="w-full">
              <input
                className={styles["input"]}
                type="text"
                required
                id="email"
                name="email"
                placeholder="Enter your email"
                minLength={10}
                maxLength={30}
              />
              {validationErrors?.email && (
                <div className="text-sm font-bold text-red-500">
                  {validationErrors.email}
                </div>
              )}
            </div>
            <div className="w-full">
              <input
                className={styles["input"]}
                type="password"
                id="password"
                name="password"
                required
                minLength={5}
                maxLength={20}
                placeholder="Enter your password"
              />
              {validationErrors?.password && (
                <div className="text-sm font-bold text-red-500">
                  {validationErrors.password}
                </div>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="mb-5 min-w-32 rounded-xl px-5 py-3 text-xl lg:mb-10"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Authenticating..."
              : isLoginMode
                ? "Login"
                : "Register"}
          </Button>
          <div className="text-center">
            {!isLoginMode
              ? "Already have an account?"
              : "Don’t have an account?"}{" "}
            <Link
              to={isLoginMode ? "/auth?mode=register" : "/auth?mode=login"}
              className="text-primary underline"
            >
              {!isLoginMode ? "Login Now" : "Register Now"}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
