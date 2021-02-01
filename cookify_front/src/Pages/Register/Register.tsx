import React, { useState } from "react";
import CookibuyLogo from "../../shared/components/icons/CookibuyLogo";
import Text from "../../shared/Text";
import styles from "./Register.module.scss";
import pl from "../../localisation/pl";
import ReCAPTCHA from "react-google-recaptcha";
import TextInput from "../../shared/components/inputs/TextInput";
import PasswordInput from "../../shared/components/inputs/PasswordInput";
import Checkbox from "../../shared/components/checkboxes/Checkbox";
import { CAPTCHA_KEY } from "../../shared/constants/Constants";
import Button from "../../shared/components/buttons/Button";
import { ButtonVariant } from "../../shared/enums/ButtonVariant";
import {
  emailRegex,
  bigCharRegex,
  smallCharRegex,
  specialCharOrDigitRegex,
} from "../../shared/constants/Regex";
import InfoBar from "../../shared/components/custom/InfoBar";
import { InfoBarVariant } from "../../shared/enums/InfoBarVariant";
import { observer } from "mobx-react-lite";
import { useStore } from "../../shared/stores/Store";
import Loader from "./../../shared/components/loader/Loader";
import { Navigation } from "../../shared/enums/Navigation";
import { useHistory } from "react-router-dom";
import { RegisterUserResultEnum } from "../../shared/enums/RegisterUserResultEnum";

const Register: React.FC = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>("");

  const { userStore } = useStore();

  const history = useHistory();

  const formValidator = () => {
    let error: string = "";

    if (!email) {
      error = pl.registration.errors.emailRequired;
    } else if (!emailRegex.test(email)) {
      error = pl.registration.errors.wrongEmail;
    } else if (!password) {
      error = pl.registration.errors.passwordRequired;
    } else if (password !== repeatedPassword) {
      error = pl.registration.errors.passwordsAreNotTheSame;
    } else if (password.length < 8) {
      error = pl.registration.errors.validator.passwordLength;
    } else if (!bigCharRegex.test(password)) {
      error = pl.registration.errors.validator.passwordBigChar;
    } else if (!smallCharRegex.test(password)) {
      error = pl.registration.errors.validator.passwordSmallChar;
    } else if (!specialCharOrDigitRegex.test(password)) {
      error = pl.registration.errors.validator.passwordSpecialChar;
    } else if (!isChecked) {
      error = pl.registration.errors.regulationsOfServiceAccepted;
    }

    setErrorText(error);

    if (error) return false;
    else return true;
  };

  const mapErrorToMessage = (status: RegisterUserResultEnum | null) => {
    switch (status) {
      case RegisterUserResultEnum.LoginIsTaken:
        return pl.registration.errors.emailIsAlreadyTaken;
      default:
        return pl.registration.errors.unknownError;
    }
  };

  return (
    <div className={styles.componentContainer}>
      <CookibuyLogo className={styles.cookifyLogo} />
      <Text className={styles.header} text={pl.registration.registrationText} />
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
        <PasswordInput
          additionalClassName={styles.inputs}
          placeholder={pl.registration.inputs.repeatPassword}
          onChange={(text) => setRepeatedPassword(text.currentTarget.value)}
        />

        <div className={styles.checkboxContainer}>
          <Checkbox
            checked={isChecked}
            sizeClass={styles.checkbox}
            onCheckedChanged={() => setChecked(!isChecked)}
          />
          <Text
            className={styles.regulationsOfServiceText}
            text={pl.registration.regulationsOfService}
          />
        </div>
      </div>
      <div className={styles.reCaptcha}>
        <ReCAPTCHA
          sitekey={CAPTCHA_KEY}
          onChange={(token) => {
            if (token) {
              setButtonDisabled(false);
            } else {
              setButtonDisabled(true);
            }
          }}
        />
      </div>
      <Button
        disabled={buttonDisabled}
        className={styles.button}
        variant={ButtonVariant.Blue}
        text={pl.registration.buttons.register}
        onClick={async () => {
          if (!formValidator()) return;

          const result = await userStore.registerUser(email, password);

          if (result.succeeded) {
            alert("Zarejestrowano");
          } else {
            setErrorText(mapErrorToMessage(result.status));
          }
        }}
      />
      <div className={styles.infoContainer}>
        {errorText && (
          <InfoBar
            variant={InfoBarVariant.Red}
            text={errorText}
            onClose={() => setErrorText("")}
          />
        )}
        {userStore.registerUserIsLoading && (
          <Loader text={pl.loading} containerClass={styles.Loader} />
        )}
      </div>
      <Button
        className={styles.button}
        variant={ButtonVariant.Orange}
        text={pl.registration.buttons.login}
        onClick={() => {
          history.push(Navigation.Login);
        }}
      />
    </div>
  );
});

export default Register;
