import { useEffect, useState } from "react";
import useFetch from "../../hooks/fetch";
import Box from "../Layout/Box";
import DishesOnPlate from "./DishesOnPlate";
import styles from "./DishList.module.css";

const DishList = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, setRequest: getRequest } = useFetch();
  let content = "OOPs!! Nothing to show!";

  useEffect(() => {
    const getResponse = fetch(
      "https://react-http-2630b-default-rtdb.firebaseio.com/meals.json"
    );
    const transformedData = (dataApplied) => {
      const mealsArray = [];
      for (const index in dataApplied) {
        mealsArray.push({
          id: dataApplied[index].key,
          name: dataApplied[index].name,
          content: dataApplied[index].content,
          price: dataApplied[index].price,
        });
      }

      setMeals(mealsArray);
    };

    getRequest(getResponse, transformedData);
  }, [getRequest]);

  const mealList = meals.map((list) => (
    <DishesOnPlate
      key={list.id}
      id={list.id}
      name={list.name}
      content={list.content}
      price={list.price}
    />
  ));

  if (mealList.length !== 0) {
    content = mealList;
  }

  if (error) {
    content = "Something went wrong!";
  }
  if (isLoading) {
    content = "Loading...";
  }
  return (
    <section className={styles.dish}>
      <Box>
        <ul>{content}</ul>
      </Box>
    </section>
  );
};

export default DishList;
