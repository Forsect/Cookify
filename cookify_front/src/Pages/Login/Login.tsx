import React, { useState } from "react";
import CookifyLogo from "../../shared/components/icons/CookifyLogo";
import Text from "../../shared/Text";
import styles from "./Login.module.scss";
import pl from "../../localisation/pl";
import TextInput from "../../shared/components/inputs/TextInput";
import PasswordInput from "../../shared/components/inputs/PasswordInput";
import Paper from "../../shared/components/papers/Paper";
import Button from "../../shared/components/buttons/Button";
import { ButtonVariant } from "../../shared/enums/ButtonVariant";
import { emailRegex } from "../../shared/constants/Regex";
import Error from "../../shared/components/custom/Error";
import { Navigation } from "../../shared/enums/Navigation";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string>("");

  const history = useHistory();

  const formValidator = () => {
    setErrors("");
    if (!email) {
      setErrors(pl.login.errors.emailRequired);
    } else if (!emailRegex.test(email)) {
      setErrors(pl.login.errors.wrongEmail);
    }
    if (!password) {
      setErrors(pl.login.errors.passwordRequired);
    }
    if (errors) return false;
    else return true;
  };

  return (
    <div className={styles.mainContainer}>
      <Paper className={styles.paper}>
        {errors ? (
          <Error borderClassName={styles.errorContainer} text={errors} />
        ) : (
          <Error borderClassName={styles.errorContainerHidden} text={""} />
        )}
        <div className={styles.bottomContainer}>
          <CookifyLogo className={styles.cookifyLogo} width={"150"} height={"150"} />
          <Text className={styles.header} text={pl.login.loginText} />
          <div className={styles.inputsContainer}>
            <TextInput
              borderClassName={styles.inputs}
              placeholder={pl.registration.inputs.email}
              onChange={(text) => setEmail(text.currentTarget.value)}
            />
            <PasswordInput
              additionalClassName={styles.inputs}
              placeholder={pl.registration.inputs.password}
              onChange={(text) => setPassword(text.currentTarget.value)}
            />

            <div className={styles.checkboxContainer}>
              <Text className={styles.forgotPasswordText} text={pl.login.forgotPasswordText} />
            </div>
          </div>
          <Button
            className={styles.loginButton}
            variant={ButtonVariant.Blue}
            text={pl.login.buttons.login}
            onClick={() => {
              console.dir(password);
              if (!formValidator()) return;
              alert("Zalogowano"); // AXIOS POST
            }}
          />

          <Button
            className={styles.registerButton}
            variant={ButtonVariant.Blue}
            text={pl.login.buttons.register}
            onClick={() => {
              history.push(Navigation.Register);
            }}
          />
        </div>
      </Paper>
    </div>
  );
};

export default Login;
