import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Paperclip } from "lucide-react"

function ImagePicker() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost"><Paperclip size={20} className="text-muted-foreground" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Select the image from you system. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture"></Label>
      <Input id="picture" type="file" />
    </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ImagePicker
