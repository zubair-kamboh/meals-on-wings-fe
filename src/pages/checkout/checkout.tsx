import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase";

export const Checkout = ()=>{


        const addOrderToFirestore = async () => {
          try {
            const orderDocRef = await addDoc(collection(firestore, "orders"), {
              customer: "/Customer_details/1QX7Os6FkU6TFVzrhcjl",
              item_array: [
                {
                  item: "/items/oxzAZqLn1hrjUCRM1cjO",
                  item_quantity: 2
                }
              ],
              order_date: "May 21, 2024 at 4:30:40 AM UTC+5:30",
              order_status: "pending",
              restaurant: "/restaurant_details/5",
              total_price: "1000.00"
            });
            console.log("Order document written with ID: ", orderDocRef.id);

            // Add delivery document using the order ID
            const deliveryDocRef = await addDoc(collection(firestore, "deliveries"), {
              delivery_cost: "20.00",
              delivery_date_time: "May 21, 2024 at 4:47:36 AM UTC+5:30",
              delivery_status: "pending",
              drone_assigned: "/drone_details/URRAy31nbKuINNXqWIMOsF",
              is_item_handed: false,
              is_item_picked: false,
              order: `/order/${orderDocRef.id}`
              // can we pass the rest_loc and delivery address here?
            });
      
            console.log("Delivery document written with ID: ", deliveryDocRef.id);
          } catch (e) {
            console.error("Error adding documents: ", e);
          }
        };

    return (
<div>This is Checkout

    <button onClick={()=>addOrderToFirestore()}>Place order</button>
</div>
    );
}