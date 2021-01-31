import React, { useState, useEffect } from "react";
import ShoppingListItem from "../../shared/components/shoppingList/ShoppingListItem";
import ShoppingListObject from "../../shared/components/shoppingList/ShoppingListObject";
import styles from "./ShoppingList.module.scss";
import pl from "./../../localisation/pl";
import InfoBar from "../../shared/components/custom/InfoBar";
import { InfoBarVariant } from "../../shared/enums/InfoBarVariant";
import { observer } from "mobx-react-lite";
import { useStore } from "../../shared/stores/Store";
import { DailyMeals } from "../../shared/models/DailyMeals";

interface ShoppingListObjectMock {
  object: { name: string; items: string[] };
}

const ShoppingList: React.FC = observer(() => {
  const [errorText, setErrorText] = useState<string>("");
  const [newProduct, setNewProduct] = useState<string>("");
  // const [shoppingList, setShoppingList] = useState<string[]>([]);

  const [shoppingListObjects, setShoppingListObjects] = useState<
    ShoppingListObjectMock[]
  >([
    { object: { name: "Frytki ze schabowym", items: [] } },
    {
      object: {
        name: "Jajecznica",
        items: ["4 jajka", "sól", "pieprz", "szczypiorek"],
      },
    },
    {
      object: {
        name: "Frytki z kurczakiem",
        items: [
          "1 kg kurczaka",
          "sól",
          "pieprz",
          "przyprawa do kurczaka",
          "folia aluminiowa",
        ],
      },
    },
  ]);

  const { shoppingStore, mealsStore } = useStore();

  const addProduct = (product: string) => {
    if (!product) {
      setErrorText("Podaj nazwę produktu");
      return;
    } else if (shoppingStore.shoppingList.mainShoppingList.includes(product)) {
      setErrorText("Produkt jest już na liścię");
      return;
    }
    shoppingStore.addProductToList(product);
    setErrorText("");
    setNewProduct("");
  };

  useEffect(() => {
    shoppingStore.getShoppingListForUser();
    mealsStore.getMealsListForUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.componentContainer}>
      <div className={styles.listContainer}>
        <div className={styles.shareButton}>
          <div>&#10150;</div>
          <div>{pl.shoppingList.share}</div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <input
              onChange={(text) => setNewProduct(text.currentTarget.value)}
              className={styles.inputText}
              placeholder={pl.shoppingList.addNew}
              onKeyDown={(key) => {
                if (key.key === "Enter") {
                  addProduct(newProduct);
                }
              }}
              value={newProduct}
            />
            <div
              onClick={() => addProduct(newProduct)}
              className={styles.inputPlusIcon}>
              &#x2B;
            </div>
          </div>
          <div className={styles.inputUnderline} />
        </div>
        <div className={styles.infoContainer}>
          {errorText && (
            <InfoBar
              className={styles.infoBar}
              textClassName={styles.infoBarText}
              variant={InfoBarVariant.Red}
              text={errorText}
              onClose={() => setErrorText("")}
            />
          )}
        </div>
        <div className={styles.shoppingListItems}>
          {shoppingStore.shoppingList.mainShoppingList.map((item, index) => {
            return (
              <ShoppingListItem
                key={item}
                name={item}
                onDelete={() => shoppingStore.removeProductFromList(item)}
              />
            );
          })}
        </div>
        {shoppingListObjects.map((item, index) => (
          <ShoppingListObject
            key={index}
            onDelete={() =>
              setShoppingListObjects(
                shoppingListObjects.filter((x, index2) => index2 !== index)
              )
            }
            items={item.object.items}
            header={item.object.name}
          />
        ))}
      </div>
    </div>
  );
});

export default ShoppingList;
