import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaArrowRight,
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import brandOne from "/public/assets/footer-card-1.png";
import brandTwo from "/public/assets/footer-card-2.png";
import brandThree from "/public/assets/footer-card-3.png";
import brandFour from "/public/assets/footer-card-4.png";
import brandFive from "/public/assets/footer-card-5.png";
import logoWhite from "/public/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 2xs:py-14 lg:py-20 lg:h-[95vh] 2xl:h-[60vh] flex items-start justify-start lg:items-center lg:justify-center font-Inter">
      <section>
        <div className="customWidth flex lg:gap-12 xl:gap-32 2xl:gap-16 lg:flex-row flex-col-reverse gap-10 2xs:gap-14">
          <div className="flex justify-start lg:justify-center">
            <div>
              <div className="flex items-center gap-2 mb-6 xl:mb-10">
                <img className="w-[50px] lg:w-[50px]" src={logoWhite}></img>
                <div>
                  <h2 className="text-xl   font-bold font-Inter">Bike Bari</h2>
                  <p className="text-[12px] -mt-1 ">Showroom</p>
                </div>
              </div>

              <h2 className="font-Inter font-bold mb-2 ">Connect us on</h2>
              <ul className="flex flex-wrap gap-4 2xs:gap-6 md:gap-8">
                <a href="https:/facebook.com">
                  {" "}
                  <FaFacebook className="text-2xl 2xs:text-3xl"></FaFacebook>{" "}
                </a>
                <a href="https:/instagram.com">
                  {" "}
                  <FaInstagramSquare className="text-2xl 2xs:text-3xl"></FaInstagramSquare>{" "}
                </a>
                <a href="https:/twitter.com">
                  {" "}
                  <FaTwitterSquare className="text-2xl 2xs:text-3xl"></FaTwitterSquare>{" "}
                </a>
                <a href="https:/linkedin.com">
                  {" "}
                  <FaLinkedin className="text-2xl 2xs:text-3xl"></FaLinkedin>{" "}
                </a>
                <a href="https:/youtube.com">
                  {" "}
                  <FaYoutube className="text-2xl 2xs:text-3xl"></FaYoutube>{" "}
                </a>
              </ul>
              <ul className="flex flex-col gap-1 mt-7 ">
                <p className=" flex items-center gap-2   ">
                  <Phone className="w-[16px]" />{" "}
                  <span className="text-footerGray">+9 (681) 843-4596</span>
                </p>
                <p className=" 3xs:flex items-center gap-2 hidden ">
                  <Mail className="w-[16px]" />{" "}
                  <span className="text-footerGray">info@bikebari.com</span>
                </p>
                <p className=" 3xs:flex items-center gap-2 hidden ">
                  <MapPin className="w-[16px]" />{" "}
                  <span className="text-footerGray">
                    123 Bike Bari, Dublin, Ireland
                  </span>
                </p>
              </ul>
            </div>
          </div>
          {/* RIGHT SIDE FOR SMALL DEVICE  */}
          <section className="flex 2xl:flex-row 2xl:gap-0 gap-10 flex-col-reverse flex-1 2xl:justify-between">
            <div className="flex flex-col sm:flex-row justify-between 2xl:w-[400px] w-full sm:gap-0 gap-10">
              <div className=" w-[240px] sm:w-auto">
                <h2 className="font-bold mb-3 ">About Bike Bari</h2>
                <ul className="text-footerGray space-y-2">
                  <li className="">About Us</li>
                  <li className="">Our Story</li>
                  <li className="">Contact Us</li>
                  <li className="">Privacy Policy</li>
                  <li className="">Terms of Service</li>
                  <li className="">Shipping Info</li>
                  <li className="">Return Policy</li>
                </ul>
              </div>

              <div className="2xl:w-auto sm:w-[400px] w-full ">
                <h2 className="font-bold mb-3 ">Customer Service</h2>
                <ul className="text-footerGray space-y-2">
                  <li className="">Help Center</li>
                  <li className="">Track Order</li>
                  <li className="">Size Guide</li>
                  <li className="">Warranty</li>
                  <li className="">Live Chat</li>
                  <li className="">Bike Assembly</li>
                  <li className="">Maintenance Tips</li>
                  <li className="">Returns & Exchanges</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between 2sm:gap-32 gap-8">
              <div className=" w-[240px] sm:w-auto">
                <h2 className="font-bold mb-3 ">Popular Bikes</h2>
                <ul className="text-footerGray space-y-2">
                  <li className="">Mountain Bikes</li>
                  <li className="">Road Bikes</li>
                  <li className="">Electric Bikes</li>
                  <li className="">Kids Bikes</li>
                  <li className="">Hybrid Bikes</li>
                  <li className="">Bike Accessories</li>
                </ul>
              </div>

              <div className="2xl:w-[400px] w-full md:w-[400px]">
                <h2 className="font-bold text-xl">Subscribe</h2>
                <p className="my-4 text-footerGray">
                  Stay informed about new bike arrivals, exclusive deals
                  <span className="hidden sm:inline">
                    <br />
                  </span>{" "}
                  and exciting offers.
                </p>
                <div>
                  <input
                    className="border-2 focus:border-p1 outline-none text-d2 bg-white py-2.5 pl-3  w-full  rounded-full"
                    placeholder="Enter email adress"
                    type="email"
                    name=""
                    id=""
                  />

                  <button
                    className="cursor-pointer hover:bg-p1 hover:text-white bg-white text-p1 w-full py-2.5 
            transition-allfont-Inter font-semibold duration-300  rounded-full mt-3 flex items-center gap-2 justify-center"
                  >
                    Subscribe <FaArrowRight className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* copyright */}

        <div className="flex items-center justify-between mt-16 border-t border-[#444] pt-7 customWidth md:flex-row flex-col-reverse lg:gap-0 gap-7">
          <div>
            <p className="text-footerGray text-center text-sm">
              Copyright © 2025 Bike Bari, Inc. All Rights Reserved
            </p>
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end gap-3">
            <img src={brandOne} alt="" />
            <img src={brandTwo} alt="" />
            <img src={brandThree} alt="" />
            <img src={brandFour} alt="" />
            <img src={brandFive} alt="" />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
