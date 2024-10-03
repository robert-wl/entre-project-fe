import useToast, { ToastType } from "@/hooks/use-toast";
import { FieldErrors, FieldValues } from "react-hook-form";

const maxLayer = 4;

export default function useToastError() {
  const { trigger } = useToast();

  const collectMessages = (object: any) => {
    const messages: string[] = [];

    function recurse(currentObj: any, layer: number) {
      for (const key in currentObj) {
        if (key === "message") {
          messages.push(currentObj[key]);
        } else if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
          if (layer > maxLayer) {
            return;
          }
          recurse(currentObj[key], layer + 1);
        }
      }
    }

    recurse(object, 0);
    return messages;
  };

  const onError = <T extends FieldValues>(error: FieldErrors<T>) => {
    const errorMessages = collectMessages(error);

    if (errorMessages.length > 0) {
      trigger(errorMessages[0], ToastType.Error);
    }
  };

  return {
    onError,
  };
}
