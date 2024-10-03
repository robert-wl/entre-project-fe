import { Bounce, toast, ToastOptions } from "react-toastify";

export enum ToastType {
  Success,
  Warning,
  Error,
}

const defaultConfig: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export default function useToast() {
  const trigger = (message: string, type: ToastType = ToastType.Success) => {
    switch (type) {
      case ToastType.Success:
        toast.success(message, defaultConfig);
        break;
      case ToastType.Warning:
        toast.warn(message, defaultConfig);
        break;
      case ToastType.Error:
        toast.error(message, defaultConfig);
        break;
      default:
        break;
    }
  };

  return {
    trigger,
  };
}
