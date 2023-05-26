import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";

const Header = ({ isOnline }) => {
  return (
    <Flex w="100%">
      <Avatar size="lg" name="Bay Max" src="/doc.png">
        <AvatarBadge boxSize="1.25em" bg={isOnline ? "green.500" : "red.500"} />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          Bay Max
        </Text>
        {isOnline ? (
          <Text color="green.500">Online</Text>
        ) : (
          <Text color="red.500">Offline</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
