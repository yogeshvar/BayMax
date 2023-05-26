import { useTts } from "tts-react";

const CustomTTSComponent = ({
  children,
  highlight = false,
  autoPlay = false,
}) => {
  const { ttsChildren } = useTts({
    children,
    markTextAsSpoken: highlight,
    autoPlay: autoPlay,
  });

  return <>{ttsChildren}</>;
};

export default CustomTTSComponent;
