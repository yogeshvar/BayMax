import React from "react";
import { Center, Grid, GridItem } from "@chakra-ui/react";
import { products } from "../assets/Store.js";
import BoxCard from "../Components/BoxCard";

const Main = () => {
  return (
    <Grid style={{ display: "grid" }} alignItems="stretch" gap={4}>
      <Center>
        <GridItem padding={2}>{BoxCard(products["baymax-chat"])}</GridItem>
        <GridItem padding={2}>{BoxCard(products["baymax-protector"])}</GridItem>
      </Center>
    </Grid>
  );
};

export default Main;
