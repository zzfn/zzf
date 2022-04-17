import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';

const Portal = (props: any) => {
  const [content, setContent] = useState(new Date().toString());
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  useEffect(() => {
    setDialogContent(document.querySelector('#modal-root'));
  }, []);

  return (
    <div>
      {dialogContent &&
        createPortal(
          <Modal
            visible={dialogVisible}
            content={content}
            close={() => {
              setDialogVisible(false);
            }}
          >
            {props.children}
          </Modal>,
          dialogContent,
        )}
      <div
        onClick={() => {
          setContent(new Date().toString());
          setDialogVisible(true);
        }}
      >
        {props.toggled}
      </div>
    </div>
  );
};

export default Portal;
