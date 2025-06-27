import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
* 
*/
export default function ProductAddView() {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button>Add</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                    </DialogHeader>

                    <Label>Title</Label>
                    <Input type="text"></Input>

                    <DialogFooter>
                        <Button>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}