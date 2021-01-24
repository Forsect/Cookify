import React from "react";
import CookibuyLogo from "../../shared/components/icons/CookibuyLogo";
import pl from "./../../localisation/pl";
import Button from "../../shared/components/buttons/Button";
import { ButtonVariant } from "../../shared/enums/ButtonVariant";
import styles from "./UnknownPage.module.scss";

const UnknownPage: React.FC = () => {
  return (
    <>
      <CookibuyLogo className={styles.cookibuyLogo} />
      <div>{pl.unknownPage.main}</div>
      <Button text={pl.unknownPage.button} variant={ButtonVariant.Blue} onClick={() => {}} />
    </>
  );
};

export default UnknownPage;
