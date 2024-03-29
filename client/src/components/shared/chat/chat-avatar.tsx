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
  className = "w-9 h-9",
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
      <AvatarFallback className={className}>{name?.slice(0, 2)?.toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
