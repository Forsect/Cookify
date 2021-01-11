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

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [isSubmittable, setSubmittable] = useState<boolean>(false);
  return (
    <div className={styles.mainContainer}>
      <CookifyLogo />
      <Text text={pl.registration.registrationText} />
      <TextInput
        placeholder={pl.registration.inputs.email}
        onChange={(text) => setEmail(text.currentTarget.value)}
      />
      <PasswordInput
        onChange={(text) => setPassword(text.currentTarget.value)}
      />
      <PasswordInput
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
      <div className={styles.reCaptcha}>
        <ReCAPTCHA sitekey={captchaKey} onChange={() => setSubmittable(true)} />
      </div>
    </div>
  );
};

export default Register;
