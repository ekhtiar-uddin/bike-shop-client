import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../../../../redux/features/admin/orderManagement.api";
import { useGetProductByIdQuery } from "../../../../redux/features/admin/productManagement.api";

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const { data: bikeData, isLoading, isFetching } = useGetProductByIdQuery(id);

  const [
    createOrder,
    { isLoading: orderIsLoading, isSuccess, data, isError, error },
  ] = useCreateOrderMutation();

  const toastId = "cart";

  useEffect(() => {
    if (orderIsLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        console.log("hello", data?.data);
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) {
      toast.error(JSON.stringify(error?.data?.message), { id: toastId });
    }
  }, [data?.data, data?.message, error, isError, orderIsLoading, isSuccess]);

  if (isLoading || isFetching || !bikeData?.data) {
    return <div className="loader">Loading...</div>; // Handle loading or missing data case
  }

  const {
    brand,
    category,
    createdAt,
    description,
    inStock,
    model,
    name,
    photoURL,
    price,
    quantity,
    updatedAt,
    _id,
  } = bikeData?.data;

  const handleAdd = () => {
    setCount((prev) => prev + 1);
  };

  const handleDeduct = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };

  const handlePlaceOrder = async () => {
    console.log("order placedsdf", {
      products: [{ product: _id, quantity: count }],
    });
    await createOrder({ products: [{ product: _id, quantity: count }] });
  };

  return (
    <>
      <div className=" mt-10">
        <h1 className="text-xl font-bold text-center border-b-2 border-b2 pb-5">
          Ok, {count} items were added to your cart. What's next?
        </h1>
      </div>

      <div className="customWidth">
        <div className=" my-16 flex lg:flex-row flex-col gap-12 justify-between">
          <div className="flex lg:flex-row flex-col gap-5">
            <div>
              <img
                className="border border-b2 w-[550px] h-[390px]"
                src={photoURL}
                alt=""
              />
            </div>
            <div>
              <h1 className="font-bold text-[20px]">
                {name} {model}:{brand}
              </h1>
              <p className="mt-5 text-d1">
                {name} {model}
              </p>

              <p className="text-[20px] font-semibold text-[#464646]">
                {count} × ${price}.00
              </p>

              <p className="mt-5 font-medium ">
                Color <span className="text-d1 ">White</span>
              </p>
              <p className="mt-5 font-medium ">
                Assembly <span className="text-d1 ">Bike Not Assembled</span>
              </p>

              <p className="mt-5 text-lg font-semibold">Quantity:</p>
              <div className="text-2xl flex justify-between items-center w-[120px] px-2 text-d1 border-2 border-b2">
                <span className="cursor-pointer" onClick={handleDeduct}>
                  -
                </span>{" "}
                {count}{" "}
                <span className="cursor-pointer" onClick={handleAdd}>
                  +
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#D9D9D9]  w-[364px] h-[490px] rounded-xl ">
            {/* <h1 className="text-[#151515] text-[25px] font-bold pt-[40px] ml-[40px] mb-[20px]">
          Features
        </h1> */}

            <div
              onClick={handlePlaceOrder}
              className="hover:bg-white text-white hover:border hover:border-p1 hover:text-p1 cursor-pointer transition-all duration-100 w-[304px] h-[50px] flex justify-center bg-p1 items-center px-[18px] rounded mx-auto mt-5"
            >
              <p className="font-bold  ">Place Order</p>
            </div>

            {/* <Modal open={open} onClose={() => setOpen(false)}>
            <div className="text-center w-[700px] ">
              <Button >Place Order</Button>
            </div>
          </Modal> */}

            <div className="mt-10">
              <p className="text-center">Order subtotal</p>
              <p className="text-t1 text-center text-3xl font-bold">
                ${price * count}.00
              </p>

              <p className="text-center mt-5">
                Your cart contains {count} items
              </p>

              <Link to="/all-products">
                <div className="hover:bg-white hover:border hover:border-b2 hover:text-t1 cursor-pointer transition-all duration-100 w-[304px] h-[50px] flex justify-center bg-t1 items-center px-[18px] rounded mx-auto mt-5 text-white">
                  <div>
                    <p className="font-bold  ">Countinue Shopping</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
