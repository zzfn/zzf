import React, { useEffect, useRef } from "react";
import styles from "./progress.module.scss";

function Progress(props) {
  const ins = useRef<any>();

  function watch() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    console.log(ins.current.value);
    console.log(winHeight);
    console.log(docHeight);
    ins.current.max = docHeight - winHeight;
    ins.current.value = window.scrollY;
  }

  useEffect(() => {
    document.addEventListener("scroll", watch);
    return () => {
      document.removeEventListener("scroll", watch);
    };
  }, []);
  return <progress className={styles.progress} ref={ins} value="0" />;
}

export default Progress;
