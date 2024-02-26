import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const fakeMsgArray = new Array(6).fill(0);

function ChatSkeleton() {
  return (
    <>
      {fakeMsgArray?.map((_, index: number) => {
        const isUserMessage = index % 2 === 0;
        return (
          <div
            key={index}
            className={cn(
              "flex flex-col gap-2 p-4 whitespace-pre-wrap",
              isUserMessage ? "items-end" : "items-start"
            )}
          >
            <div
              className={cn(
                "flex gap-3 items-center",
                isUserMessage ? "flex-row-reverse" : "flex-row"
              )}
            >
              <Skeleton className="w-10 h-10 rounded-full" />
              <span className=" bg-accent p-3 rounded-md max-w-xs">
                <Skeleton className="h-1 w-[200px] rounded-md" />
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ChatSkeleton;
