import React, { useState, useEffect, Suspense } from "react";
import {
  Center,
  Divider,
  Flex,
  Box,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/layout";
// eslint-disable-next-line no-unused-vars
import { ModelF2 } from "../Components/EmoTalker/F-Talk";
import { ModelF } from "../Components/EmoTalker/F";
import { Canvas } from "@react-three/fiber";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";
import GenericComment from "../Pages/Comment";
import { convertDataToJson, mockData } from "../assets/Store";
import { OrbitControls } from "@react-three/drei";

export default function BayMax() {
  // eslint-disable-next-line no-unused-vars
  const [isOffline, setIsOffline] = useState(false);
  const [data, setData] = useState([]);
  const [blur, setBlur] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const runBayMax = async () => {
    setIsLoading(true);
    const restructData = convertDataToJson(mockData);
    try {
      const response = await fetch(process.env.REACT_APP_BAYMAX_IP + "v2", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seeker: restructData.seeker,
          response: restructData.replies[0],
          return_original: true,
          used_paid_account: false,
        }),
      });
      if (response.ok) {
        const res = await response.json();
        var mockCopy = mockData;
        mockCopy[0].replies.push({
          id: "baymax-id-1",
          content: res.baymax,
          author: "Baymax",
          avatar: "https://joeschmoe.io/api/v1/random",
        });
        setData(mockCopy);
        setBlur(false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsOffline(true);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    setBlur(true);
    setData(mockData);
    async function checkOnline() {
      const response = await fetch(process.env.REACT_APP_BAYMAX_IP);
      if (response.ok) {
        setIsOffline(false);
      } else {
        setIsOffline(true);
        setIsLoading(false);
      }
    }
    checkOnline();

    // eslint-disable-next-line
  }, []);

  return (
    <Grid style={{ display: "grid" }} alignItems="stretch" gap={1}>
      <Center>
        <GridItem padding={10} margin={10}>
          <>
            <Canvas
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
                <ModelF position={[0.055, -0.85, 0]} />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </>
        </GridItem>
        <GridItem padding={10} margin={10}>
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
            <>
              <Flex w="100%" h="85vh" justify="center" align="center">
                <Flex w={["100%", "100%", "100%"]} h="90%" flexDir="column">
                  <Center>
                    <Box
                      as="button"
                      bg="teal"
                      color="white"
                      size="sm"
                      w={150}
                      onClick={runBayMax}
                      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                      disabled={isOffline}
                      _disabled={{
                        opacity: 0.4,
                        cursor: "not-allowed",
                        boxShadow: "none",
                      }}
                      _focus={{
                        boxShadow:
                          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                      }}
                    >
                      Turn on Bay Max
                    </Box>
                  </Center>
                  <Center>
                    <Box>
                      {isOffline && (
                        <Text color="red" fontSize={"xs"}>
                          Bay Max is offline
                        </Text>
                      )}
                    </Box>
                  </Center>
                  <Divider padding={2} />
                  <GenericComment
                    isLoading={isLoading}
                    data={data}
                    isBlur={blur}
                  />
                </Flex>
              </Flex>
            </>
          )}
        </GridItem>
      </Center>
    </Grid>
  );
}
