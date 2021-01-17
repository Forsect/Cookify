import React, { useEffect } from "react";
import Text from "../../Text";
import Paper from "../papers/Paper";
import ShoppingListItem from "./ShoppingListItem";
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
  return (
    <>
      <div className={styles.itemContainer}>
        <Text text={props.name} />
      </div>
      <div className={styles.underLine} />
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
          X
        </div>
      </div>
      {props.items.length > 0 && <div className={styles.line} />}
      {props.items.length > 0 && (
        <ul>
          {props.items.map((item, index) => (
            <li>
              <ShoppingListObjectSingleItem name={item} />
            </li>
          ))}
        </ul>
      )}
    </Paper>
  );
};

export default ShoppingListObject;
