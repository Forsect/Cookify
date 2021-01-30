import React, { useState } from "react";
import styles from "./ShoppingListItem.module.scss";

interface ShoppingListItemProps {
  name: string;
  onDelete?: () => void;
  disableOnClick?: boolean;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = (
  props: ShoppingListItemProps
) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <>
      <div className={styles.itemContainer}>
        <div
          onClick={() => !props.disableOnClick && setIsChecked(!isChecked)}
          className={isChecked ? styles.textChecked : styles.text}>
          {props.name}
        </div>
        {props.onDelete && (
          <div className={styles.deleteButton} onClick={props.onDelete}>
            &#10761;
          </div>
        )}
      </div>
      <div className={styles.underline} />
    </>
  );
};

export default ShoppingListItem;
