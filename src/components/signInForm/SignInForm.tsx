import { FormEvent, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/Button";
import { useLogIn } from "../../utils/hooks/api/user";
import { selectUserInfos, useAppSelector } from "../../utils/hooks/selectors";

export default function SignInForm(): React.ReactElement {
  const { handleLogIn, error } = useLogIn();
  const userInfos = useAppSelector(selectUserInfos);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("username") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("remember-me") === "on";

    const res = await handleLogIn({ email, password, rememberMe });

    if (!res?.token) setIsLoading(false);
  }

  const ErrorMessage = memo(() =>
    error ? (
      <p className="sign-in-form__error">Connection attempt failed</p>
    ) : null
  );

  useEffect(() => {
    if (userInfos) {
      navigate("/profile/" + userInfos.id);
      setIsLoading(false);
    }
  }, [navigate, userInfos]);

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <div className="sign-in-form__input-wrapper">
        <label htmlFor="username">Username</label>
        <input required type="text" id="username" name="username" />
      </div>
      <div className="sign-in-form__input-wrapper">
        <label htmlFor="password">Password</label>
        <input required type="password" id="password" name="password" />
      </div>
      <div className="sign-in-form__input-remember">
        <input type="checkbox" id="remember-me" name="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <Button isLoading={isLoading} label="Sign in" type="submit" />
      <ErrorMessage />
    </form>
  );
}
