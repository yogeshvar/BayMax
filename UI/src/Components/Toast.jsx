import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function useToastHook() {
  const [state, setState] = useState(undefined);
  const toast = useToast();

  useEffect(() => {
    if (state) {
      const { message, status, description } = state;

      toast({
        title: message,
        description: description,
        status: status,
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  }, [state, toast]);

  return [state, setState];
}
