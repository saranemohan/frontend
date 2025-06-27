import { Card, CardContent } from "@/components/ui/card";
import ProductAddView from "./product-add-view";

/**
* 
*/
export default function ProductManagementView() {
    return (
        <>
        <Card className="flex w-full">
            <CardContent>
                <ProductAddView/>

            </CardContent>
        </Card>
        </>
    );
}