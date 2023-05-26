import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import { TextToSpeech } from "tts-react";

const Messages = ({ messages, speak }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const isSubscribed =
    messages.filter((item) => item.from === "me").length === 20;
  const [isTyping, setIsTyping] = useState(true);

  return (
    <>
      <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
        {isSubscribed && (
          <Flex
            p="3"
            minW={"60%"}
            minH={"25%"}
            bg="black"
            opacity="0.5"
            zIndex="111"
            flexDirection={"revert"}
            position={"absolute"}
            justify="center"
            alignItems="center"
          >
            <Center>
              <Box>
                <Text fontSize="xl" color={"white"} p="5">
                  Please subscribe to chat more...
                </Text>
                <Center>
                  <Button
                    onClick={() =>
                      window.open("https://baymax.typedream.app", "_blank")
                    }
                  >
                    Subscribe
                  </Button>
                </Center>
              </Box>
            </Center>
          </Flex>
        )}
        {messages.map((item, index) => {
          if (item.from === "me") {
            return (
              <Flex
                key={index}
                w="100%"
                justify="flex-end"
                filter={isSubscribed ? "blur(2px)" : ""}
              >
                <Flex bg="black" color="white" my="1" p="3">
                  <Text fontSize="13">{item.text}</Text>
                </Flex>
              </Flex>
            );
          } else {
            return (
              <Flex
                key={index}
                w="100%"
                filter={isSubscribed ? "blur(2px)" : ""}
              >
                <Avatar
                  size={"sm"}
                  name="computer"
                  src="/doc.png"
                  bg="blue.300"
                ></Avatar>
                <Flex bg="gray.100" color="black" p="1" borderRadius={10}>
                  <Text fontSize="13">
                    {isTyping && (
                      <Typewriter
                        onInit={(typewriter) => {
                          typewriter
                            .typeString(item.text)
                            .pauseFor(1000)
                            .start()
                            .callFunction(() => {
                              setIsTyping(false);
                            });
                        }}
                      />
                    )}
                    {!isTyping && (
                      <TextToSpeech
                        align="horizontal"
                        allowMuting
                        markTextAsSpoken
                        position="topRight"
                        size="small"
                        style={{ margin: "0" }}
                      >
                        {item.text}
                      </TextToSpeech>
                    )}
                  </Text>
                </Flex>
              </Flex>
            );
          }
        })}
        <AlwaysScrollToBottom />
      </Flex>
    </>
  );
};

export default Messages;
