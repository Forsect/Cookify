import React, { useState } from "react";
import CookifyLogo from "../../shared/components/icons/CookifyLogo";
import Text from "../../shared/Text";
import styles from "./Register.module.scss";
import pl from "../../localisation/pl";
import ReCAPTCHA from "react-google-recaptcha";
import TextInput from "../../shared/components/inputs/TextInput";
import PasswordInput from "../../shared/components/inputs/PasswordInput";
import Checkbox from "../../shared/components/checkboxes/Checkbox";
import captchaKey from "../../shared/constants/CaptchaKey";
import Paper from "../../shared/components/papers/Paper";
import Button from "../../shared/components/buttons/Button";
import { ButtonVariant } from "../../shared/enums/ButtonVariant";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  return (
    <div className={styles.mainContainer}>
      <Paper className={styles.paper}>
        <CookifyLogo />
        <Text text={pl.registration.registrationText} />
        <div className={styles.inputsContainer}>
          <TextInput
            borderClassName={styles.inputs}
            placeholder={pl.registration.inputs.email}
            onChange={(text) => setEmail(text.currentTarget.value)}
          />
          <PasswordInput
            additionalClassName={styles.inputs}
            onChange={(text) => setPassword(text.currentTarget.value)}
          />
          <PasswordInput
            additionalClassName={styles.inputs}
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
            sitekey={captchaKey}
            onChange={() => setButtonDisabled(false)}
          />
        </div>
        <Button
          disabled={buttonDisabled}
          className={styles.button}
          variant={ButtonVariant.Blue}
          text={pl.registration.registerButton}
          onClick={() => {
            /* jakis axios */
          }}
        />
      </Paper>
    </div>
  );
};

export default Register;
