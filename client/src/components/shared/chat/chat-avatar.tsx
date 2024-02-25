"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  src: string;
  name: string;
  className?: string;
}

export default function ChatAvatar({
  src,
  name,
  className = "w-10 h-10",
}: Props) {
  return (
    <Avatar className="flex justify-center items-center">
      <AvatarImage
        src={src}
        alt={name}
        width={6}
        height={6}
        className={className}
      />
      <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}
