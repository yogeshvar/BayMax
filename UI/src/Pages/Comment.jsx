import React from "react";
import CommentHoC from "../Components/CommentHoC";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

const GenericComment = ({ isLoading, data, isBlur }) => {
  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          {data.map((comment, idx) => (
            <React.Fragment key={idx}>
              <CommentHoC
                blur={isBlur}
                id={comment.id}
                comment={comment}
                replies={comment.replies}
              />
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

export default GenericComment;
