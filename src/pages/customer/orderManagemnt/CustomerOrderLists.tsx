import { Badge } from "../../../components/reusable/badge";
import { useGetOrdersQuery } from "../../../redux/features/admin/orderManagement.api";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

import { useAppSelector } from "../../../redux/hooks";
import { TOrdersData } from "../../../types/orderManagement.type";

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
  user: Record<string, any>;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function CustomerOrderLists() {
  const user = useAppSelector(selectCurrentUser);
  const { isLoading, data: orders } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const orderData: TOrdersData[] =
    (orders?.data?.ordersData as TOrdersData[]) || [];

  const customerOrders: TOrdersData[] = orderData?.filter(
    (item) => item?.user?.email === user?.email,
  );

  return isLoading ? (
    "Loading"
  ) : (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground md:text-2xl">
          My Orders
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Review your recent orders, products, and payment details.
        </p>
      </div>

      <div className="space-y-4">
        {customerOrders?.map((order, index) => (
          <div className="rounded-lg border border-border bg-card p-4 md:p-5">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Order Summary
                </p>
                <p className="text-xs text-muted-foreground">
                  Created {new Date(order?.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground">
                  Total:{" "}
                  <span className="font-medium text-foreground">
                    ${order?.totalPrice?.toFixed(2)}
                  </span>
                </div>
                <Badge
                  variant={order?.status === "Pending" ? "outline" : "default"}
                >
                  {order?.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-md border border-border/60 bg-background/40 p-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Customer Information
                </h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">User ID</span>
                    <span className="font-medium text-foreground">
                      {order?.user?._id ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-foreground">
                      {order?.user?.email ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Last updated</span>
                    <span className="font-medium text-foreground">
                      {new Date(order?.updatedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">
                      Est. delivery date
                    </span>
                    <span className="font-medium text-foreground">
                      {order.estimatedDeliveryDate
                        ? new Date(order.estimatedDeliveryDate).toLocaleString()
                        : "Not Updated"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border/60 bg-background/40 p-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Transaction Details
                </h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">
                      Transaction ID
                    </span>
                    <span className="font-medium text-foreground">
                      {order?.transaction?.id ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">
                      Payment method
                    </span>
                    <span className="font-medium text-foreground">
                      {order?.transaction?.method ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">
                      Transaction date
                    </span>
                    <span className="font-medium text-foreground">
                      {order?.transaction?.date_time ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Bank status</span>
                    <span className="font-medium text-foreground">
                      {order?.transaction?.bank_status ?? "—"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 rounded-md border border-border/60 bg-background/40 p-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Products
                </h3>
                <ul className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {order?.products?.map((product, i) => (
                    <li
                      key={i}
                      className="rounded-md border border-border bg-card p-3"
                    >
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Product ID
                        </span>
                        <span className="font-medium text-foreground">
                          {product?.product ?? "—"}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">Quantity</span>
                        <span className="font-medium text-foreground">
                          {product?.quantity ?? "—"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
