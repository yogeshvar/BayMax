import React, { useEffect, useState } from "react";
import { Flex, Button, Box, Textarea } from "@chakra-ui/react";
import { disabledFlexClass } from "../Pages/Chat";
import {
  DeleteOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Footer = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isOnline,
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [hasListened, setHasListened] = useState(false);

  useEffect(() => {
    setInputMessage(transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setHasListened(true);
  };

  const resetListening = () => {
    SpeechRecognition.stopListening();
    setHasListened(false);
    resetTranscript();
  };

  const sendMessageToContainer = () => {
    handleSendMessage();
    setHasListened(false);
  };

  return (
    <Flex w="100%" mt="5" style={isOnline ? {} : disabledFlexClass}>
      <Textarea
        margin={5}
        flexWrap={"wrap"}
        placeholder="Type Something... or Press the Play Button to Speak"
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        disabled={!isOnline}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Box m={4}>
        <Flex>
          {listening ? (
            <PauseCircleFilled
              style={{
                fontSize: "45px",
                cursor: isOnline ? "pointer" : "not-allowed",
              }}
              onClick={isOnline ? stopListening : null}
              disabled={!isOnline}
            />
          ) : (
            <PlayCircleFilled
              style={{ fontSize: "45px" }}
              onClick={isOnline ? startListening : null}
              disabled={!isOnline}
            />
          )}
          {hasListened && (
            <DeleteOutlined
              style={{ fontSize: "45px", color: "red" }}
              onClick={resetListening}
              disabled={!isOnline}
            />
          )}
        </Flex>
      </Box>
      <Button
        m={5}
        bg="black"
        color="white"
        borderRadius="none"
        _hover={
          !isOnline
            ? {
                cursor: "not-allowed",
              }
            : {
                bg: "white",
                color: "black",
                border: "1px solid black",
              }
        }
        disabled={inputMessage.trim().length <= 0 && !isOnline}
        onClick={!isOnline ? null : sendMessageToContainer}
      >
        Send
      </Button>
    </Flex>
  );
};

export default Footer;
