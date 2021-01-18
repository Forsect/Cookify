import React, { useState } from "react";
import CookifyLogo from "../../shared/components/icons/CookifyLogo";
import Text from "../../shared/Text";
import styles from "./Register.module.scss";
import pl from "../../localisation/pl";
import ReCAPTCHA from "react-google-recaptcha";
import TextInput from "../../shared/components/inputs/TextInput";
import PasswordInput from "../../shared/components/inputs/PasswordInput";
import Checkbox from "../../shared/components/checkboxes/Checkbox";
import { CAPTCHA_KEY } from "../../shared/constants/Constants";
import Paper from "../../shared/components/papers/Paper";
import Button from "../../shared/components/buttons/Button";
import { ButtonVariant } from "../../shared/enums/ButtonVariant";
import { emailRegex, bigCharRegex, smallCharRegex, specialCharOrDigitRegex } from "../../shared/constants/Regex";
import Error from "../../shared/components/custom/Error";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  // const [{ data, loading, error }, executeRegister] = useAxios(
  //   {
  //     url: `${BASE_API_URL}${endpoints.client.REGISTER}`,
  //     method: "POST",
  //   },
  //   { manual: true }
  // );

  const formValidator = () => {
    setErrors("");
    if (!isChecked) {
      setErrors(pl.registration.errors.regulationsOfServiceAccepted);
    }
    if (!email) {
      setErrors(pl.registration.errors.emailRequired);
    } else if (!emailRegex.test(email)) {
      setErrors(pl.registration.errors.wrongEmail);
    }

    if (!password) {
      setErrors(pl.registration.errors.passwordRequired);
    } else {
      if (password !== repeatedPassword) {
        setErrors(pl.registration.errors.passwordsAreNotTheSame);
      }
      if (password.length < 8) {
        setErrors(pl.registration.errors.validator.passwordLength);
      }
      if (!bigCharRegex.test(password)) {
        setErrors(pl.registration.errors.validator.passwordBigChar);
      }
      if (!smallCharRegex.test(password)) {
        setErrors(pl.registration.errors.validator.passwordSmallChar);
      }
      if (!specialCharOrDigitRegex.test(password)) {
        setErrors(pl.registration.errors.validator.passwordSpecialChar);
      }
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
              <Checkbox checked={isChecked} sizeClass={styles.checkbox} onCheckedChanged={() => setChecked(!isChecked)} />
              <Text className={styles.regulationsOfServiceText} text={pl.registration.regulationsOfService} />
            </div>
          </div>
          <div className={styles.reCaptcha}>
            <ReCAPTCHA sitekey={CAPTCHA_KEY} onChange={() => setButtonDisabled(false)} />
          </div>
          <Button
            disabled={buttonDisabled}
            className={styles.button}
            variant={ButtonVariant.Blue}
            text={pl.registration.registerButton}
            onClick={() => {
              console.dir(password);
              if (!formValidator()) return;
              // executeRegister({
              //   data: {
              //     Email: email,
              //     Password: password,
              //   },
              // }).catch(() => setErrors("Błąd serwera!"));
            }}
          />
        </div>
      </Paper>
    </div>
  );
};

export default Register;
