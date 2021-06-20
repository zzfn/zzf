import React from 'react';
import Icon from '../Icon';
import styles from './loading.module.scss';
function Loading(): JSX.Element {
  return <Icon className={styles.loading} name={'loading'} />;
}

export default Loading;
