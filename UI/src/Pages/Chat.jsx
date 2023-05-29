import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Image,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import React, { useEffect, useState, Suspense } from "react";
import Divider from "../Components/Divider";
import Footer from "../Components/Footer";
import Messages from "../Components/Messages";
import { ModelF2 } from "../Components/EmoTalker/F-Talk";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// write class styles here
export const disabledFlexClass = {
  cursor: "not-allowed",
  opacity: "0.7",
};

const welcomeMessage = [
  {
    from: "computer",
    text: "Hi, My Name is BayMax. How are you doing today?",
  },
];

const offlineMessage = [
  {
    from: "computer",
    text: "Sorry, I am offline. Please contact me later. Probably AWS is not running. :)",
  },
];

const ModelCanvas = ({ isTalk }) => {
  return (
    <Canvas
      id="model"
      camera={{ position: [0.75, 2, 9.5], fov: 15 }}
      style={{
        width: "35vw",
        height: "90vh",
      }}
    >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <ModelF2 position={[0.055, -0.85, 0]} onTalk={isTalk} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

const Chat = ({ isOnline }) => {
  const [messages, setMessages] = useState(offlineMessage);
  const [isTalk, setIsTalk] = useState(false);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    setMessages(isOnline ? welcomeMessage : offlineMessage);
  }, [isOnline]);

  const generateResponseModel = async (input) => {
    setIsTyping(true);
    const response = await fetch(process.env.REACT_APP_BAYMAX_IP + "v3", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input,
        used_paid_account: false,
      }),
    });
    console.log({ response });
    if (response.ok) {
      const data = await response.json();
      setIsTyping(false);
      setIsTalk(true);
      return data;
    }
  };

  const handleSendMessageModel = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;
    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");
    var response = await generateResponseModel(data);
    setMessages((old) => [...old, { from: "computer", text: response.baymax }]);
    setInputMessage("");
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={1}>
      <GridItem colSpan={1} padding={2}>
        <>
          <ErrorBoundary FallbackComponent={WebGLError}>
            <ModelCanvas isTalk={isTalk} />
          </ErrorBoundary>
        </>
      </GridItem>
      <GridItem padding={3} colSpan={2}>
        {isLoading ? (
          <Flex w="100%" h="85vh" justify="center" align="center">
            <Flex w={["100%", "100%", "100%"]} h="90%" flexDir="column">
              <Box padding="6" boxSize="lg" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={10}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            </Flex>
          </Flex>
        ) : (
          <Flex w="100%" h="85vh" justify="center" align="center">
            <Flex
              w={["100%", "100%", "100%"]}
              h="90%"
              flexDir="column"
              style={isOnline ? {} : disabledFlexClass}
            >
              <Messages
                messages={messages}
                isOnline={isOnline}
                speak={isTalk}
              />
              {isTyping && <Text>BayMax is thinking...</Text>}
              <Divider />
              <Footer
                isOnline={isOnline}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessageModel}
              />
            </Flex>
          </Flex>
        )}
      </GridItem>
    </Grid>
  );
};

function WebGLError({ error, resetErrorBoundary }) {
  const toast = useToast();
  const id = "test-toast";

  if (!toast.isActive(id)) {
    toast({
      title: "WebGL Error",
      description: "Enable WebGL to use this feature.",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  }

  return (
    <Center>
      <VStack spacing={1} align="stretch">
        <Image src="./f-img.png" alt="F-Talk" width="80%" />
      </VStack>
    </Center>
  );
}

export default Chat;
