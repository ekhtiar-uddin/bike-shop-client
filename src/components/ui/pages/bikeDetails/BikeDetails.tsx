import { skipToken } from "@reduxjs/toolkit/query";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../../redux/features/admin/productManagement.api";
import Navbar from "../../navbar/Navbar";
import Footer from "../home/footer/Footer";

const BikeDetails = () => {
  const { id } = useParams();
  const {
    data: bikeData,
    isLoading,
    isFetching,
  } = useGetProductByIdQuery(id ?? skipToken);

  if (isLoading || isFetching || !bikeData?.data) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    ); // Handle loading or missing data case
  }

  const {
    brand,
    category,
    description,
    inStock,
    model,
    name,
    photoURL,
    price,
    quantity,
  } = bikeData.data;

  const arr = [category, brand, quantity, model];

  console.log(inStock);

  return (
    <>
      <Navbar />
      <div className="customWidth">
        <section className="mt-8 md:mt-12 mb-20 lg:mb-[130px]">
          <div className="relative detailsBg w-full h-[24vh] 2xs:h-[28vh] lg:h-[45vh] bg-no-repeat rounded-xl flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-black/35" />

            <div className="relative z-10 w-full">
              <h1 className="ml-4 2xs:ml-5 lg:ml-[100px] text-[28px] 2xs:text-[34px] md:text-[40px] lg:text-[45px] font-bold text-white">
                Bike Details
              </h1>
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full lg:max-w-[296px] max-w-[220px]">
              <svg
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 296 50"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M296 49.3H0L27.8 0H268.3L296 49.3Z" fill="#41a541" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fill="white"
                  fontSize="16"
                >
                  Home/Bike Details
                </text>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_364px] gap-6 lg:gap-8 mt-8">
            <div className="min-w-0">
              <div className="rounded-xl overflow-hidden bg-white">
                <img
                  className="w-full h-[240px] 2xs:h-[300px] md:h-[380px] lg:h-[420px] object-cover"
                  src={photoURL}
                  alt={`${name} ${model}`}
                />
              </div>

              <div className="mt-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                  <h1 className="text-[26px] 2xs:text-[30px] md:text-[35px] font-bold leading-tight">
                    {name} {model}
                  </h1>

                  <div className="flex items-center gap-3">
                    <p className="font-bold text-[22px] 2xs:text-[26px] text-p1">
                      ${price}.00
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        inStock
                          ? "bg-p1/10 text-p1"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {inStock ? "In stock" : "Stock out"}
                    </span>
                  </div>
                </div>

                <p className="text-d1 mt-5 md:mt-6 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <aside className="w-full">
              <div className="bg-gray-100 rounded-xl p-6 md:p-7">
                <h1 className="text-[#151515] text-[22px] md:text-[25px] font-bold mb-5">
                  Features
                </h1>

                <div className="space-y-3">
                  {arr.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="w-full h-[52px] md:h-[56px] flex justify-between bg-p1 items-center px-4 md:px-[18px] rounded"
                    >
                      <p className="font-semibold text-white text-sm md:text-base">
                        {item === model
                          ? `Model ${item}`
                          : item === quantity
                            ? inStock
                              ? `${item} Available`
                              : "Stock Out"
                            : item}
                      </p>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Link to={`/checkout/${id}`}>
                  <button className="cursor-pointer w-full h-[54px] md:h-[56px] bg-p1 rounded text-white font-semibold text-[16px] md:text-[18px] flex justify-center items-center hover:bg-p1/90 transition-colors">
                    Proceed Checkout
                  </button>
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default BikeDetails;
