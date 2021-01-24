import React, { useState } from "react";
import CookibuyLogo from "../../shared/components/icons/CookibuyLogo";
import Text from "../../shared/Text";
import styles from "./Login.module.scss";
import pl from "../../localisation/pl";
import TextInput from "../../shared/components/inputs/TextInput";
import PasswordInput from "../../shared/components/inputs/PasswordInput";
import Button from "../../shared/components/buttons/Button";
import { ButtonVariant } from "../../shared/enums/ButtonVariant";
import { emailRegex } from "../../shared/constants/Regex";
import { Navigation } from "../../shared/enums/Navigation";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../shared/stores/Store";
import InfoBar from "../../shared/components/custom/InfoBar";
import { InfoBarVariant } from "../../shared/enums/InfoBarVariant";
import { AccountStatusEnum } from "../../shared/enums/AccountStatusEnum";
import Loader from "../../shared/components/loader/Loader";

const Login: React.FC = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState<string>("");

  const { userStore } = useStore();

  const history = useHistory();

  const formValidator = () => {
    let error: string = "";

    setErrorText("");
    if (!email) {
      error = pl.login.errors.emailRequired;
    } else if (!emailRegex.test(email)) {
      error = pl.login.errors.wrongEmail;
    } else if (!password) {
      error = pl.login.errors.passwordRequired;
    }

    setErrorText(error);

    if (error) return false;
    else return true;
  };

  const mapErrorToMessage = (status: AccountStatusEnum | null) => {
    switch (status) {
      case AccountStatusEnum.InvalidLoginOrPassword:
        return pl.login.errors.invalidLoginOrPassword;
      case AccountStatusEnum.InactiveAccount:
        return pl.login.errors.inactiveAccount;
      default:
        return pl.login.errors.unknownError;
    }
  };

  return (
    <div className={styles.componentContainer}>
      <CookibuyLogo className={styles.cookifyLogo} />
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

        <div className={styles.forgotPassword}>
          <Text className={styles.forgotPasswordText} text={pl.login.forgotPasswordText} />
        </div>
      </div>
      <Button
        className={styles.loginButton}
        variant={ButtonVariant.Blue}
        text={pl.login.buttons.login}
        onClick={async () => {
          console.dir(password);
          if (!formValidator()) return;
          const result = await userStore.authorizeUser(email, password);

          if (result.succeeded) {
            history.push(Navigation.Home);
          } else {
            setErrorText(mapErrorToMessage(result.status));
          }
        }}
      />
      <div className={styles.infoContainer}>
        {errorText && <InfoBar variant={InfoBarVariant.Red} text={errorText} onClose={() => setErrorText("")} />}
        {userStore.authorizeUserIsLoading && <Loader text={pl.loading} containerClass={styles.Loader} />}
      </div>
      <Button
        className={styles.registerButton}
        variant={ButtonVariant.Orange}
        text={pl.login.buttons.register}
        onClick={() => {
          history.push(Navigation.Register);
        }}
      />
    </div>
  );
});

export default Login;
