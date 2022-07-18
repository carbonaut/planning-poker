import { createContext, useContext, useEffect, useState } from "react";
import Toast from "../components/Toast/toast";

/* eslint-ignore-next-line */
const AppContext = createContext<any | undefined>(undefined);

const initialStatus = { type: "", visible: false };

export function ToastContext({ children }) {
  const [message, setMessage] = useState("test message");
  const [messageStatus, setMessageStatus] = useState(initialStatus);
  const [toastTimeout, setToastTimeout] = useState();

  useEffect(() => {
    if (message === "") {
      return;
    }
    showError();
  }, [message]);

  const showError = () => {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      setToastTimeout(undefined);
    }

    setMessageStatus({ type: "error", visible: true });
    const eTimeout: any = setTimeout(() => {
      hideToast();
    }, 3000);

    setToastTimeout(eTimeout);
  };

  const hideToast = () => {
    setMessageStatus((state) => ({ ...state, visible: false }));
    setTimeout(() => {
      setMessage("");
    }, 295);

    clearTimeout(toastTimeout);
    setToastTimeout(undefined);
  };

  return (
    <AppContext.Provider value={{ setMessage }}>
      {children}
      <Toast
        message={message}
        visible={messageStatus.visible}
        type={messageStatus.type}
        onHide={hideToast}
      ></Toast>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
