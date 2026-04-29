import {
  selectGlobalParams,
  setGlobalParams,
} from "@/redux/features/auth/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { slides } from "../../../constants/global";
import { useGetAllProductsQuery } from "../../../redux/features/admin/productManagement.api";
import { TQueryParam } from "../../../types";
import gear from "/public/assets/gear.png";
import logoColor from "/public/assets/logo-color.png";

const Banner = () => {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const globalParams = useAppSelector(selectGlobalParams);

  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const transitionToSlide = (targetIndex: number) => {
    if (slides.length <= 1) return;
    if (targetIndex === currentIndexRef.current) return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    setNextIndex(targetIndex);
    setIsOverlayVisible(false);

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      setIsOverlayVisible(true);
      transitionTimeoutRef.current = window.setTimeout(() => {
        setCurrentIndex(targetIndex);
        setNextIndex(null);
        setIsOverlayVisible(false);
        isAnimatingRef.current = false;
      }, 500);
    });
  };

  useEffect(() => {
    if (slides.length <= 1) return;

    const intervalId = window.setInterval(() => {
      const nextIndex =
        currentIndexRef.current === slides.length - 1
          ? 0
          : currentIndexRef.current + 1;
      transitionToSlide(nextIndex);
    }, 2000);

    return () => {
      window.clearInterval(intervalId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (transitionTimeoutRef.current)
        window.clearTimeout(transitionTimeoutRef.current);
      isAnimatingRef.current = false;
    };
    // Intentionally depend only on slides length (slides is a module constant)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides?.length - 1 : currentIndex - 1;
    transitionToSlide(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    transitionToSlide(newIndex);
  };

  const [params] = useState<TQueryParam[] | undefined>(undefined);
  const { data: bikeData } = useGetAllProductsQuery(globalParams);

  // console.log("params here", params);

  console.log("bikeData", bikeData);
  const goToSlide = (slideIndex: number) => {
    transitionToSlide(slideIndex);
  };

  const SlidePanel = ({ index }: { index: number }) => (
    <div
      style={{
        backgroundImage: `url(${slides[index].url})`,
      }}
      className="absolute inset-0 flex h-full w-full items-center justify-start bg-[#444] bg-blend-overlay bg-cover bg-no-repeat bg-[center_30%]"
    >
      <div className="customWidth mt-14 2xs:mt-16 md:mt-20 w-full text-white">
        <div className="inline-block bg-gray-800 bg-opacity-70 px-3 py-1 rounded-full text-[12px] font-medium mb-4">
          {slides[index].pinPoint}
        </div>

        <h1 className="text-3xl 2xs:text-4xl 2sm:text-5xl 2lg:text-6xl leading-tight 2sm:leading-[56px] 2lg:leading-[63px] max-w-[680px] font-bold mb-5 2xs:mb-6">
          {slides[index].title}
        </h1>

        <p className="text-sm sm:text-base 2lg:text-xl max-w-[720px] text-gray-200 mb-6 2xs:mb-8 leading-relaxed">
          {slides[index].description}
        </p>

        <div className="flex flex-wrap gap-3 2xs:gap-4">
          <Link to={`/all-products`}>
            <button
              onClick={() =>
                dispatch(
                  setGlobalParams([
                    ...(params?.filter((p) => p.name !== "searchTerm") || []),
                    {
                      name: "searchTerm",
                      value: slides[index].filterBtn,
                    },
                  ]),
                )
              }
              className="w-full xs:w-auto px-3 2xs:px-6 py-2 2xs:py-2.5 rounded font-semibold bg-white cursor-pointer text-black text-sm transition-colors"
            >
              Shop {slides[index].filterBtn}
            </button>
          </Link>
          <Link to={`/all-products`}>
            <button className="w-full xs:w-auto px-3 2xs:px-6 py-1.5 2xs:py-2  rounded font-semibold border-2 border-white hover:bg-white text-white cursor-pointer hover:text-black text-sm transition-colors">
              Browse All Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="mb-20">
      {/* lg:h-[680px] */}
      <div className=" relative ">
        <div
          className="bg-gray-800 hover:bg-gray-800/80 bg-blend-overlay transition-all duration-300 rounded-full absolute top-[50%] translate-x-[0%]
        
        translate-y-[-50%] left-2 2xs:left-4 md:left-8 cursor-pointer z-10 p-1.5 2xs:p-2 hidden xs:block"
          onClick={goToPrevious}
        >
          {" "}
          <ChevronLeft className="text-white " />
        </div>
        <div
          className="hidden xs:block bg-gray-800 hover:bg-gray-800/80 transition-all duration-300 rounded-full absolute top-[50%] translate-x-[0%]
        
        translate-y-[-50%] right-2 2xs:right-4 md:right-8 cursor-pointer z-10 p-1.5 2xs:p-2"
          onClick={goToNext}
        >
          <ChevronRight className="text-white " />
        </div>
        <div className="relative mb-6 h-[60vh] 2xs:h-[65vh] 2lg:h-[70vh] w-full overflow-hidden bg-[#444]">
          <div className="absolute inset-0">
            <SlidePanel index={currentIndex} />
          </div>

          {nextIndex !== null ? (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                isOverlayVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <SlidePanel index={nextIndex} />
            </div>
          ) : null}
        </div>

        <div className="flex sm:flex-row sm:gap-0 gap-4 2xs:gap-6 items-start flex-col customWidth sm:items-center justify-between">
          <div className="2lg:flex hidden cursor-pointer gap-2">
            {slides.map((slide, slideIndex) => (
              <div
                className=""
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
              >
                <img
                  className="rounded  w-[80px] h-[55px]"
                  src={slide.url}
                ></img>
              </div>
            ))}
          </div>

          <div className=" flex justify-between items-start gap-3">
            <div className="bg-[#dcfce7] rounded-sm p-2">
              <img className="w-[30px] " src={gear} alt="sdf" />
            </div>
            <div>
              <h1 className="font-semibold text-sm ">
                {" "}
                {slides[currentIndex].primaryCardTitle}
              </h1>
              <p className="xl:w-[350px] text-sm font-medium text-d1">
                {" "}
                {slides[currentIndex].primaryCardDescription}
              </p>
            </div>
          </div>
          <div className="2xl:flex 2lg:hidden 3xs:flex items-start gap-3">
            <div className="bg-[#dcfce7]  rounded-sm p-2">
              <img className="w-[30px] " src={logoColor} alt="sdf" />
            </div>
            <div>
              <h1 className="font-semibold text-sm ">
                {" "}
                {slides[currentIndex].secondaryCardTitle}
              </h1>
              <p className="xl:w-[350px] text-sm font-medium text-d1">
                {" "}
                {slides[currentIndex].secondaryCardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
