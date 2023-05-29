import Chat from "../Pages/Chat";
import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { Center } from "@chakra-ui/layout";
import { Skeleton, Box, Text } from "@chakra-ui/react";

const ChatWidget = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log(process.env.REACT_APP_BAYMAX_IP);

  useEffect(() => {
    async function checkOnline() {
      try {
        const response = await fetch(process.env.REACT_APP_BAYMAX_IP, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setIsLoading(false);
          setIsOnline(true);
        } else {
          setIsLoading(false);
          setIsOnline(true);
        }
      } catch (error) {
        setIsLoading(false);
        setIsOnline(true);
      }
    }

    checkOnline();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Skeleton isLoaded={!isLoading}>
        <Chat isOnline={isOnline} />
        <Center m={5}>
          <Box>
            <Button
              textAlign={"center"}
              justifyContent={"center"}
              colorScheme="teal"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Return to Home
            </Button>
          </Box>
        </Center>
        <Center>
          <Box ml={1}>
            <Text fontSize="12">
              Powered by Custom Model Trained on GPT-2 and Model can be found on
              Github and HuggingFace
            </Text>
          </Box>
        </Center>
      </Skeleton>
    </>
  );
};

export default ChatWidget;
