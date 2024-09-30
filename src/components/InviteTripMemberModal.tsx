import React, { ComponentProps, FC } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { UseFormRegister } from "react-hook-form";

interface Props {
  buttonProps: ComponentProps<typeof Button>;
  register: UseFormRegister<{
    emails: string;
  }>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const InviteTripMemberModal: FC<Props> = ({ buttonProps, register, handleSubmit }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-24 text-base font-bold rounded-full"
          {...buttonProps}>
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center w-3/4 max-w-xl rounded-xl">
        <DialogHeader>
          <DialogTitle>Invitation</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            {...register("emails")}
            placeholder="Email"
            className="w-full max-w-lg mb-4"
          />
          <Button
            type="submit"
            className="w-24 font-bold rounded-full">
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteTripMemberModal;
