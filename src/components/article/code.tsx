import React from "react";
import hljs from "highlight.js";
import styles from "./code.module.scss";
import CopyToClipboard from "react-copy-to-clipboard";

export default function Code({ language, code }) {
  return (
    <div className={styles.code}>
      <pre>
        <code className={`language-${language}`} lang={language}>
          <div
            dangerouslySetInnerHTML={{
              __html: language
                ? hljs.highlight(language, code).value
                : hljs.highlightAuto(code).value,
            }}
          />
        </code>
      </pre>
      <div className={styles.action}>
        <div>
          <CopyToClipboard
            onCopy={(text): void => {
              console.log(text);
            }}
            text={"https://cdn.annyyy.com/"}
          >
            <a lang={language} style={{ color: "#8c8c8ccc", border: "none" }}>
              复制代码
            </a>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
