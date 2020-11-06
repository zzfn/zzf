import React from "react";
import styles from "./tag.module.scss";
interface TagProps {
  color: string;
}

const Tag: React.FC<TagProps> = ({ children, color }) => {
  return (
    <span className={styles.tag} style={{ color }}>
      {children}
    </span>
  );
};
export { Tag };
