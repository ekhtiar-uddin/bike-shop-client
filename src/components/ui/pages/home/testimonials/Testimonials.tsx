import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import CarouselButton from "../shared/headertitle/CarouselButton.jsx";
import SharedHeaderTitle from "../shared/headertitle/SharedHeaderTitle.jsx";
import { testimonials } from "./testimonials.constants";
import Group from "/assets/Group.png";
const Testimonials = () => {
  const [currentId, setCurrentId] = useState(1);
  const currectReview = testimonials.find(
    (testimonial) => testimonial.id === currentId,
  );

  const { image, name, address, review } = currectReview;

  const handleNext = () => {
    if (currentId === 4) {
      return;
    } else {
      setCurrentId((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentId === 1) {
      return;
    } else {
      setCurrentId((prev) => prev - 1);
    }
  };

  return (
    <section className="mt-24 z-0 relative overflow-hidden   addFlexItems">
      <div className=" z-30 customWidth">
        <div className="mb-10">
          <SharedHeaderTitle
            handleNext={handleNext}
            handlePrev={handlePrev}
            heading="What Some of my Customers Say"
            title="Smooth Rides, Every Turn Matters"
          />
        </div>
        <div className="lg:h-[555px] h-[900px] flex flex-col-reverse lg:flex-row w-full">
          <div className="relative flex-1 bg-p1 h-[335px] lg:h-full addFlex ">
            <div className="h-[285px] lg:h-[411px] w-[280px] lg:w-[386px] addFlexBetween flex-col">
              <div>
                <p className="subTitle md:text-lg text-sm">{review}</p>
              </div>

              <div className="relative border-b  border-white pb-4  addFlexBetween w-full">
                <div>
                  <h3 className="text-white font-Bebas font-lg font-medium">
                    {name}
                  </h3>
                  <p className="text-white text-sm">{address}</p>
                </div>

                <div className="border-b-4 right-0 -top-0.5 border-white absolute pb-5">
                  <img
                    className="w-[39px] h-[39px] rounded-full"
                    src={image}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div>
              <img
                className="absolute w-[24px] lg:w-[39px] left-0 -bottom-0.5 lg:bottom-12"
                src={Group}
                alt=""
              />
            </div>
          </div>

          <div className="bg-[url('https://dma.canyon.com/image/upload/w_850,h_850,c_fill/f_auto/q_auto/2025_Launch_Product_Grizl_Web_Homepage_Gear_2400x2400_ALL_rja6ky')] addFlex  bg-cover flex-1 lg:w-[763px]  bg-center">
            <div className="w-[49px] h-[49px] addFlex bg-p1 rounded-full">
              <FaPlay className="text-lg" />
            </div>
          </div>
        </div>
        <div className="flex justify-center  lg:hidden  mt-5 ">
          <CarouselButton handleNext={handleNext} handlePrev={handlePrev} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
