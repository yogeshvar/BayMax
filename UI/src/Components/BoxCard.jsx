import { Box, Image, Divider, Text } from "@chakra-ui/react";

export default function ProductDisplay(property) {
  return (
    <Box
      maxW="lg"
      h="auto"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={"black"}
      style={{ cursor: "pointer" }}
      onClick={() => {
        window.location.href = property.link;
      }}
    >
      <Image
        textAlign={"center"}
        src={property.imageUrl}
        alt={property.imageAlt}
      />

      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h1" lineHeight="7" noOfLines={2}>
          <Text fontSize={28}>{property.title}</Text>
        </Box>
        <Divider orientation="vertical" color={"black"} m={1.5} />
        <Box overflow={"hidden"}>{property.description}</Box>
      </Box>
    </Box>
  );
}
