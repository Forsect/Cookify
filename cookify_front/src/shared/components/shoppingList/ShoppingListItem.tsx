import React, { useState } from "react";
import styles from "./ShoppingListItem.module.scss";

interface ShoppingListItemProps {
  name: string;
  onDelete: () => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = (props: ShoppingListItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <>
      <div onClick={() => setIsChecked(!isChecked)} className={styles.itemContainer}>
        <div className={isChecked ? styles.textChecked : styles.text}>{props.name}</div>
        <div className={styles.deleteButton} onClick={props.onDelete}>
          &#10761;
        </div>
      </div>
      <div className={styles.underline} />
    </>
  );
};

export default ShoppingListItem;
