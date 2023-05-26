import React, { useState, createElement } from "react";
import Comment from "@ant-design/compatible/lib/comment";
import { Tooltip, Avatar } from "antd";
import { TextToSpeech } from "tts-react";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";

const CommentHoC = ({ id, comment, replies, blur }) => {
  return (
    <>
      <SingleComment id={id} comment={comment} type="comment" blur={false} />
      {replies.map((reply, idx) => (
        <SingleComment
          idx={idx}
          key={reply.id}
          comment={reply}
          blur={blur}
          type="reply"
        />
      ))}
    </>
  );
};

const SingleComment = ({ idx, comment, blur, type, children }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isTyping, _setIsTyping] = useState(true);
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  console.log("idx", type);

  return (
    <Comment
      actions={[
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like}>
            {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
            <span className="comment-action">{likes}</span>
          </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
          <span onClick={dislike}>
            {React.createElement(
              action === "disliked" ? DislikeFilled : DislikeOutlined
            )}
            <span className="comment-action">{dislikes}</span>
          </span>
        </Tooltip>,
        <span key="comment-nested-reply-to">Reply to</span>,
      ]}
      author={comment.author}
      avatar={<Avatar icon={<UserOutlined />} alt={comment.author} />}
      content={
        <p className={blur ? "blur" : ""}>
          {type === "comment" && <>{comment.content}</>}
          {type === "reply" && isTyping && !blur ? (
            <TextToSpeech
              align="vertical"
              markTextAsSpoken
              position="topRight"
              size="small"
              style={{ margin: "0" }}
            >
              {comment.content}
            </TextToSpeech>
          ) : (
            <>{comment.content}</>
          )}
          {type === "reply" && !isTyping && (
            <TextToSpeech
              align="vertical"
              markTextAsSpoken
              position="topRight"
              size="small"
              style={{ margin: "0" }}
            >
              {comment.content}
            </TextToSpeech>
          )}
        </p>
      }
    >
      {children}
    </Comment>
  );
};

export default CommentHoC;
