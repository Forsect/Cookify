import React, { useState, useEffect, useRef } from "react";
import { Manager, Reference, Popper } from "react-popper";
import UserIcon from "../../shared/components/icons/UserIcon";
import onClickOutside from "react-onclickoutside";
import styles from "./PopperUserIcon.module.scss";
import { JWT_LOCAL_STORAGE_KEY } from "../../shared/constants/Constants";
import { Redirect, useHistory } from "react-router-dom";
import { Navigation } from "../../shared/enums/Navigation";

interface UserIconPopperProps {
  className: string;
  onClick: () => void;
}

const UserIconPopper: React.FC<UserIconPopperProps> = (
  props: UserIconPopperProps
) => {
  const [isVisible, setIsVisible] = useState(false);
  const mouseOutsideRef = useRef(null);
  useOnClickOutside(mouseOutsideRef, () => setIsVisible(false));
  const history = useHistory();

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div ref={ref}>
            <UserIcon
              className={props.className}
              onClick={() => setIsVisible(!isVisible)}
            />
          </div>
        )}
      </Reference>
      <Popper placement="bottom">
        {({ ref, style, placement, arrowProps }) => {
          return (
            isVisible && (
              <div
                className={styles.wrapper}
                ref={ref}
                data-placement={placement}>
                <div ref={mouseOutsideRef} className={styles.menuContainer}>
                  <div
                    className={styles.menuItem}
                    onClick={() => {
                      props.onClick();
                      setIsVisible(false);
                    }}>
                    Posiłki
                  </div>
                  <div
                    className={styles.menuItem}
                    onClick={() => {
                      localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
                      history.replace(Navigation.Login);
                    }}>
                    Wyloguj
                  </div>
                </div>
                <div ref={arrowProps.ref} style={arrowProps.style} />
              </div>
            )
          );
        }}
      </Popper>
    </Manager>
  );
};

function useOnClickOutside(ref: any, handler: any) {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export default UserIconPopper;
