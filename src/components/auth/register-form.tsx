import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuthService from "@/components/hooks/useAuthService";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SignUpValidator,
  TSignUpValidator,
  signUpIntialValues,
} from "@/lib/validators/auth";
import { CardWrapper } from "./card-wrapper";

export default function RegisterForm() {

  const { loading, signupFn } = useAuthService();

  const form = useForm<TSignUpValidator>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: signUpIntialValues,
  });

  const onSubmit = async (data: TSignUpValidator) => {
    // console.log("submut", data);
    signupFn(data);
  };

  return (
    <>
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account? Login here"
        backButtonHref="/auth/login"
        showSocial
      >
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Anmol Tanwar" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input placeholder="itsanmol" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="draft@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We recommend using your personal email
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </FormProvider>
      </CardWrapper>
    </>
  );
}

// "use client";
// import useListenMessages from "@/components/hooks/useListenMessages";
// import { SonnerDemo } from "@/components/shared/sooner-demo";
// import { Button } from "@/components/ui/button";
// import { useSocket } from "@/context/socket-context";
// import { SOCKET_CONNECTION_TYPES } from "@/lib/enum";
// import useStore from "@/zustand";
// import { nanoid } from "nanoid";
// import { useRef } from "react";
// import { useShallow } from "zustand/react/shallow";

// export default function Home() {
//   //hooks
//   const { emitSocketEvent } = useSocket();
//   const messages = useStore(useShallow((state) => state.messages));
//   useListenMessages();

//   //input
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleSendMessage = () => {
//     // Access the current property of the inputRef to get the input element
//     const inputValue = inputRef.current?.value ?? "";

//     if (!inputValue.trim()) return;

//     let data = {
//       id: nanoid(),
//       session_id: "1",
//       type: "text",
//       value: inputValue,
//       mediaUrl: "aa",
//       senderId: "123",
//       seen: false,
//     };
//     emitSocketEvent(SOCKET_CONNECTION_TYPES.AGENT_CHAT, data);

//     // Set the input value to an empty string to clear it
//     if (inputRef.current) {
//       inputRef.current.value = "";
//       inputRef.current?.focus();
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent the default form submission behavior
//     handleSendMessage();
//   };
//   return (
//     <section className="maxWidthWrapper">
//       <SonnerDemo />
//       <div>
//         <div>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <input name="input-box" ref={inputRef} />
//               <Button variant={"outline"} type="submit">
//                 Send
//               </Button>
//             </div>
//           </form>
//         </div>
//         <div>
//           {messages.map((e, index) => {
//             // console.log(`🚀 ~ file: page.tsx:43 ~ {messages.map ~ e:`, e);
//             return <li key={e?.id}>{e?.value}</li>;
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
