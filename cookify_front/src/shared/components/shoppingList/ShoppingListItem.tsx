import React, { useState } from "react";
import Text from "../../Text";
import TextInput from "../inputs/TextInput";
import styles from "./ShoppingListItem.module.scss";

interface ShoppingListItemProps {
  name: string;
  onDelete: () => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = (props: ShoppingListItemProps) => {
  const [name, setName] = useState(props.name);
  return (
    <>
      <div className={styles.itemContainer}>
        <input className={styles.input} value={name} onChange={(text) => setName(text.currentTarget.value)} />
        <div className={styles.deleteButton} onClick={props.onDelete}>
          &times;
        </div>
      </div>
      <div className={styles.underLine} />
    </>
  );
};

export default ShoppingListItem;
