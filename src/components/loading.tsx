import { getCdn } from "../utils/getCdn";
import LottiePlayer from "../components/LottiePlayer";
import React from "react";

const Loading = () => {
  return <LottiePlayer size={50} url={getCdn('/assets/logo.json')} />
};
export default Loading
