"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function Page() {
  return (
    <>
    Subhan Asghar
    <Button className="m-2" onClick={() => toast.success("Hello, World!")}>
      Click me
    </Button>
    </>
  )
}
