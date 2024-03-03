import useCreateConversations from "@/components/hooks/useCreateConversations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emailSchema } from "@/lib/validators/auth";
import { Loader2, SquarePen } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function CreateConversation() {
  const { loading, createConversations } = useCreateConversations();
  const emailInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!emailInputRef.current?.value) return;

    const result = emailSchema.safeParse(emailInputRef.current?.value);
    if (result.success) {
      createConversations(result.data).then(() => {
        handleCancel();
      }).finally(() => { 
        handleCancel();
      });
    } else {
      console.error("Invalid email:", result?.error);
      toast.error("Invalid email", {
        description: `Please enter a valid email address.`,
        position: "top-center",
        duration: 1000,
      });
    }
  };

  const handleCancel = () => {
    console.log("Cancel");
    //note must add this custom line to shadcn the DialogContent --- dialog primivate.close
    document.getElementById("closeDialog")?.click();
  };

  return (
      <Dialog>
        <DialogTrigger asChild>
          <SquarePen size={20} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new Chat</DialogTitle>
            <DialogDescription>
              Enter the email of the person you want to chat with
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                defaultValue="anmol@a.com"
                className="col-span-3"
                ref={emailInputRef}
              />
            </div>
          </div>
        <DialogFooter>
        <DialogClose asChild>
            <Button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full"
            >
              {loading ? (
                <Loader2 size={20} className={"text-primary/60 animate-spin"} />
              ) : null}{" "}
              Create Conversation
            </Button>
          </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}

export default CreateConversation;
