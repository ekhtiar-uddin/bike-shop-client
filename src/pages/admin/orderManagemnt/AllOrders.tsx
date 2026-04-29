import { Col, Flex } from "antd";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { Badge } from "../../../components/reusable/badge";
import { Button } from "../../../components/reusable/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "../../../components/reusable/card";
import Skeleton from "../../../components/Skeleton/Skeleton";
import Modal from "../../../components/ui/pages/checkout/modal/Modal";
import { statusesOptions } from "../../../constants/global";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../../redux/features/admin/orderManagement.api";
import { TOrdersData } from "../../../types/orderManagement.type";

type OrderWithEstimatedDeliveryDate = TOrdersData & {
  estimatedDeliveryDate?: string;
};

type MutationErrorShape = {
  data?: {
    message?: string;
  };
};

export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface Product {
  product: string;
  quantity: number;
  _id: string;
}

export interface Order {
  transaction: Transaction;
  _id: string;
  user: string;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function AllOrders() {
  const [orderId, setOrderId] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { isLoading, data: orders } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const orderData: OrderWithEstimatedDeliveryDate[] =
    (orders?.data?.ordersData as OrderWithEstimatedDeliveryDate[]) || [];

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  console.log(orderData);
  const handleDeleteOrder = async (orderId: string) => {
    const toastId = toast.loading("Creating... ");

    const deleteData = {
      id: orderId,
    };

    try {
      const res = await deleteOrder(deleteData);
      if (res.error) {
        const message = (res.error as MutationErrorShape)?.data?.message;
        toast.error(message || "Something went wrong", { id: toastId });
      } else {
        toast.success("Product Deleted", { id: toastId });
        setOpenDelete(false);
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleUpdateOrder = (orderId: string) => {
    setOpenUpdate(true);
    setOrderId(orderId);

    // Implement the update functionality here
    console.log("Update order :", orderId);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating... ");
    console.log("here", data);

    // console.log("createbike", bikeData);
    const updateData = {
      id: orderId,
      data: {
        status: data.status,
        estimatedDeliveryDate: data.estimatedDeliveryDate.format(
          "M/D/YYYY, h:mm:ss A",
        ),
      },
    };

    console.log("uddatedData", updateData);

    try {
      const res = await updateOrder(updateData);
      if (res.error) {
        console.log(res.error);
        const message = (res.error as MutationErrorShape)?.data?.message;
        toast.error(message || "Something went wrong", { id: toastId });
      } else {
        console.log("here", res);
        toast.success("Product Updated", { id: toastId });
        // setOpen(false);
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground md:text-2xl">
          All Orders
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage order statuses, delivery estimates, and customer purchases.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {orderData?.map((order) => (
          <Card key={order._id} className="border border-border bg-card">
            <CardContent className="p-4 md:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Order</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {order._id}
                  </p>
                </div>
                <Badge
                  variant={order?.status === "Pending" ? "outline" : "default"}
                >
                  {order?.status}
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center justify-between gap-4 rounded-md border border-border/60 bg-background/40 px-3 py-2">
                  <span className="text-muted-foreground">Total price</span>
                  <span className="font-medium text-foreground">
                    ${order.totalPrice?.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-md border border-border/60 bg-background/40 px-3 py-2">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium text-foreground">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-md border border-border/60 bg-background/40 px-3 py-2">
                  <span className="text-muted-foreground">Est. delivery</span>
                  <span className="font-medium text-foreground">
                    {order.estimatedDeliveryDate
                      ? new Date(order.estimatedDeliveryDate).toLocaleString()
                      : "Not Updated"}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-stretch gap-4 p-4 pt-0 md:p-5 md:pt-0">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="dashboardTwo"
                  className="rounded px-5 py-2"
                  onClick={() => handleUpdateOrder(order._id)}
                >
                  Update
                </Button>
                <Modal
                  open={openUpdate && orderId === order._id}
                  onClose={() => setOpenUpdate(false)}
                >
                  <div className="w-[92vw] max-w-[520px]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md border border-border bg-background p-2">
                        <Pencil size={18} className="text-red-500" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-foreground">
                          Update Order
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Change order status and estimated delivery date.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <Flex justify="center" align="center">
                        <Col span={24}>
                          <PHForm onSubmit={onSubmit}>
                            <PHSelect
                              label="Status"
                              name="status"
                              options={statusesOptions}
                            />

                            <PHInput
                              type="date"
                              label="Estimated Delivery Date"
                              name="estimatedDeliveryDate"
                            />
                            <div className="mt-2 flex justify-end gap-3">
                              <button
                                type="submit"
                                className="btn btn-light px-7"
                                onClick={() => setOpenUpdate(false)}
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                className="btn btn-light px-7"
                                onClick={() => setOpenUpdate(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          </PHForm>
                        </Col>
                      </Flex>
                    </div>
                  </div>
                </Modal>
                <Button
                  variant="dashboardOne"
                  className="rounded px-5 py-2"
                  onClick={() => {
                    setOrderId(order._id);
                    setOpenDelete(true);
                  }}
                >
                  Delete
                </Button>
                <Modal
                  open={openDelete && orderId === order._id}
                  onClose={() => setOpenDelete(false)}
                >
                  <div className="w-[92vw] max-w-[520px]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md border border-border bg-background p-2">
                        <Trash size={18} className="text-red-500" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-foreground">
                          Confirm delete
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Are you sure you want to delete this order?
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex justify-end gap-3">
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="btn btn-danger px-7"
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-light px-7"
                        onClick={() => setOpenDelete(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>

              <div className="rounded-md border border-border/60 bg-background/40 p-3">
                <p className="text-sm font-medium text-foreground">Products</p>
                <ul className="mt-2 space-y-2 text-sm">
                  {order?.products?.map((product, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-4 rounded-md border border-border bg-card px-3 py-2"
                    >
                      <span className="truncate text-muted-foreground">
                        {product?.product}
                      </span>
                      <span className="font-medium text-foreground">
                        x{product?.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
