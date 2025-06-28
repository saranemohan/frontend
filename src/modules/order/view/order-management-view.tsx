import { Card, CardContent } from "@/components/ui/card";
import OrderAddView from "./order-add-view";

/**
* 
*/
export default function OrderManagementView() {
    return (
        <>
        <Card className="flex w-full">
            <CardContent>
                <OrderAddView/>

            </CardContent>
        </Card>
        </>
    );
}