import React, { useState } from 'react';
import styles from './search.module.scss';
function Search(props) {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <span onClick={() => setIsShow(true)}>{props.children}</span>
      {isShow && <div className={styles.search}>1212312312312312312312</div>}
    </>
  );
}

export default Search;
