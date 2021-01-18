import React from "react";
import CookifyLogo from "./../../shared/components/icons/CookifyLogo";
import pl from "./../../localisation/pl";
import Button from "../../shared/components/buttons/Button";
import { ButtonVariant } from "../../shared/enums/ButtonVariant";

const UnknownPage: React.FC = () => {
  return (
    <>
      <CookifyLogo width={"150"} height={"150"} />
      <div>{pl.unknownPage.main}</div>
      <Button text={pl.unknownPage.button} variant={ButtonVariant.Blue} onClick={() => {}} />
    </>
  );
};

export default UnknownPage;
