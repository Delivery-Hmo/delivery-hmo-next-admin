import { App } from "antd";

const useModal = () => {
  const { modal } = App.useApp();

  return modal;
};

export default useModal;