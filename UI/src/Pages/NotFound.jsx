import React, { useEffect } from "react";
import { Box, Center, Divider } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import notFoundLottie from "../assets/lottie/not-found.json";
import { useToastHook } from "../Components/Toast";
import Lottie from "lottie-react";
import { useRouteError } from "react-router";

export default function ErrorPage() {
  // eslint-disable-next-line no-unused-vars
  const error = useRouteError();
  // eslint-disable-next-line no-unused-vars
  const [_, newToast] = useToastHook();
  useEffect(() => {
    setTimeout(() => {
      newToast({
        message: "Error Encountered",
        status: "info",
        description: "We are redirecting you to the home page.",
      });
      window.location.href = "/";
    }, 50000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center>
      <Box>
        <Lottie
          animationData={notFoundLottie}
          style={{ width: "450px", height: "450px" }}
        />
        <Divider />
        <Center>
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
        </Center>
      </Box>
      {/* add a button that says return to home */}
    </Center>
  );
}
