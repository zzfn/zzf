import React from 'react';
import styles from './message.module.scss';
import { createPortal, render } from 'react-dom';
// import './style/button.scss';
// import { Info } from './Info';
// export interface MessageProps {
//   /** 点击事件 */
//   msg: string;
// }
//
// export const Message: React.FC<MessageProps> = (props) => {
//   const containerDiv = document.createElement('div');
//   containerDiv.className = 'msg';
//   document.body.appendChild(containerDiv);
//   return createPortal(info, containerDiv);
// };

// Message.defaultProps = {};
// export class message1 {
//   static success(msg: string) {
//     const containerDiv = document.createElement('div');
//     document.body.appendChild(containerDiv);
//     // 这里返回的是对该组件的引用
//     const TestCompInstance = render(info, containerDiv);
//     console.log(TestCompInstance);
//     // 这里可以调用任何 TestCompInstance 上的方法，并且能够访问到其 this
//   }
// }
function createMessage(message, Com) {
  let el = document.querySelector('.rc-message');
  if (!el) {
    el = document.createElement('div');
    el.className = styles.message;
    document.body.appendChild(el);
  }
  let msg = document.createElement('div');
  msg.className = styles.box;
  el.appendChild(msg);
  const component = React.createElement(Com, {
    message,
  });
  setTimeout(() => {
    el.removeChild(msg);
  }, 3000);
  return render(createPortal(component, msg), msg);
}
function Info() {
  return <>操作成功</>;
}
export const message = {
  info(message) {
    return createMessage(message, Info);
  },
};
