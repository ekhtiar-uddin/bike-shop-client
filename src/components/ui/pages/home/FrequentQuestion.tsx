"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "../../../../constants/global";

const FrequentQuestion = () => {
  const [currentId, setCurrentId] = useState(null);

  const handleVisibility = (itemId) => {
    if (itemId === currentId) {
      setCurrentId(null);
    } else {
      setCurrentId(itemId);
    }
  };

  return (
    <div className="my-24">
      <h1 className="text-3xl md:text-5xl   mb-16 text-center font-bold text-primary-800">
        Frequently Asked <br className="md:hidden block" /> Questions
      </h1>

      <section className="customWidth xl:w-[40%] lg:w-[50%] md:w-[60%] mx-auto">
        {faqs.map((item) => (
          <div
            onClick={() => handleVisibility(item?.id)}
            key={item?.id}
            className="border-b border-b3"
          >
            <div
              className="pt-2 cursor-pointer flex 
            justify-between   "
            >
              <h1 className="md:pb-8 pb-5  font-bold text-base sm:text-xl text-primary-800 w-[97%]">
                {item?.question}
              </h1>{" "}
              {item?.id === currentId ? (
                <Minus className="3xs:w-[40px] " />
              ) : (
                <Plus className="3xs:w-[40px] " />
              )}
            </div>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                item?.id === currentId ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="smallDesc descriptionText text-left pb-5">
                  {item?.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FrequentQuestion;
