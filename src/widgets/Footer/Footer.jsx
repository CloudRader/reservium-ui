import React from "react";
import bubenLogo from "../../assets/buben_logo.svg";
import { Heart } from "lucide-react";
import { emails } from "../../constants";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-50 to-green-100 shadow-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-start">
            <a
              href="https://wiki.buk.cvut.cz/cs/home"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline mb-2"
            >
              <div className="mb-4 md:mb-0">
                <span className="text-xl mr-2 font-bold text-green-800">
                  Buben Club
                </span>
                <img
                  src={bubenLogo}
                  alt="Buben Club Logo"
                  className="w-12 h-12 inline-block"
                />
              </div>
            </a>
            <a
              href={`mailto:${emails.feedback}`}
              className="text-green-600 hover:text-green-800 no-underline mb-4"
            >
              Made by PS team <Heart className="inline-block w-4 h-4" />
            </a>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 mr-6 md:mb-0">
              <h3 className="font-semibold text-green-800 mb-2">Help</h3>
              <div className="space-y-1">
                <a
                  href="https://wiki.buk.cvut.cz/en/for-members/faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 block no-underline"
                >
                  How to become a member
                </a>
                <a
                  href="https://wiki.buk.cvut.cz/cs/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 block no-underline"
                >
                  Wiki
                </a>
                <a
                  href="https://linktr.ee/bubenklub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 block no-underline"
                >
                  Links
                </a>
              </div>
            </div>
            <div className="mb-4 mr-6 md:mb-0">
              <h3 className="font-semibold text-green-800 mb-2">
                Our social networks
              </h3>
              <div className="space-y-1">
                <a
                  href="https://www.instagram.com/bubenklub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 block no-underline"
                >
                  Instagram
                </a>
                <a
                  href="https://discord.gg/cwb8mRD3Qg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 block no-underline"
                >
                  Discord
                </a>
                <a
                  href="https://t.me/+7HvQ_-rPlSxlZDcy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 block no-underline"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
