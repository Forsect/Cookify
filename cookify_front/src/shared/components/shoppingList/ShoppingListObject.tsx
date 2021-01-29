import React, { useState } from "react";
import Text from "../../Text";
import Paper from "../papers/Paper";
import styles from "./ShoppingListObject.module.scss";

interface ShoppingListObjectSingleItemProps {
  name: string;
}

interface ShoppingListObjectProps {
  onDelete: () => void;
  items: string[];
  header: string;
}

const ShoppingListObjectSingleItem: React.FC<ShoppingListObjectSingleItemProps> = (
  props: ShoppingListObjectSingleItemProps
) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setIsChecked(!isChecked)}
        className={styles.itemContainer}>
        <Text
          className={isChecked ? styles.itemTextChecked : styles.itemText}
          text={props.name}
        />
      </div>
      <div className={styles.underline} />
    </>
  );
};

const ShoppingListObject: React.FC<ShoppingListObjectProps> = (
  props: ShoppingListObjectProps
) => {
  return (
    <Paper className={styles.paper}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>{props.header}</div>
        <div onClick={props.onDelete} className={styles.deleteButton}>
          &#10761;
        </div>
      </div>
      {props.items.length > 0 && <div className={styles.line} />}
      {props.items.length > 0 && (
        <div className={styles.shoppingListObjectItems}>
          {props.items.map((item, index) => (
            <ShoppingListObjectSingleItem key={item} name={item} />
          ))}
        </div>
      )}
    </Paper>
  );
};

export default ShoppingListObject;
