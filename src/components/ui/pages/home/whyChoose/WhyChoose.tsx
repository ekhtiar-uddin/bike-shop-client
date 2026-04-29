import { HandMetal, Handshake, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChoose = () => {
  return (
    <div className="dark:text-[#0B0E01] customWidth">
      <h2 className="text-3xl capitalize  text-center lg:text-4xl font-Inter font-extrabold  mb-14">
        Why choose us
      </h2>

      <div className="grid lg:grid-cols-3  md:grid-cols-2 gap-10 ">
        <div className="bg-[#f2f2f2] p-5 rounded-3xl">
          <div className="bg-white max-w-max mx-auto p-5 rounded-full">
            <Handshake className="text-p1" size={48} />
          </div>
          <h2 className="text-2xl font-bold my-5 text-center">
            Trusted Expertise
          </h2>
          <p className="text-center px-5 descriptionText">
            Benefit from our years of industry knowledge and professionalism,
            ensuring you make informed decisions every step of the way.
          </p>
          <div className="flex justify-center mt-5">
            <Link to={`/login`}>
              <button className="border-b3 border bg-white px-4 py-2  rounded hover:shadow-lg hover:translate-x-1 transition-all duration-300 ">
                {" "}
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-[#f2f2f2]  p-5 rounded-3xl">
          <div className="bg-white max-w-max mx-auto p-5 rounded-full">
            <Sparkles className="text-p1" size={48} />
          </div>

          <h2 className="text-2xl font-bold my-5 text-center">
            Exceptional Selection
          </h2>
          <p className="text-center px-5 descriptionText">
            Explore our vast array of top-quality vehicles from leading brands,
            meticulously curated to meet your diverse preferences and needs.
          </p>

          <div className="flex justify-center mt-5">
            <Link to={`/login`}>
              <button className="bg-p1 border text-white px-4 py-2  rounded hover:shadow-lg hover:translate-x-1 transition-all duration-300 ">
                {" "}
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-[#f2f2f2]  p-5 rounded-3xl">
          <div className="bg-white max-w-max mx-auto p-5 flex justify-center items-center rounded-full ">
            <HandMetal className="text-p1" size={48} />
          </div>

          <h2 className="text-2xl font-bold my-5 text-center">
            Continued Support{" "}
          </h2>
          <p className="text-center px-5 descriptionText">
            Experience peace of mind knowing our dedicated team will be by your
            side even after your purchase, providing ongoing assistance.
          </p>
          <div className="flex justify-center mt-5">
            <Link to={`/login`}>
              <button className="border-b3 border bg-white px-4 py-2  rounded hover:shadow-lg hover:translate-x-1 transition-all duration-300 ">
                {" "}
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
