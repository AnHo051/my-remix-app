import Logo from "../../images/Logo-White.png";
import FacebookIcon from "../../images/facebook.svg";
import TwitterIcon from "../../images/twitter.svg";
import TiktokIcon from "../../images/tiktok.svg";
import LinkedinIcon from "../../images/linkedin.svg";

export default function Footer() {
  return (
    <div className="flex w-full items-center justify-center bg-accent-blue">
      <div className="flex w-11/12 flex-col items-center justify-center pb-4 pt-10 lg:pb-6 lg:pt-14">
        <img src={Logo} alt="logo" className="mb-10 h-auto w-36 lg:w-48" />
        <div className="flex w-full flex-col justify-center gap-5 text-center text-white lg:flex-row lg:justify-evenly lg:gap-14 lg:text-left">
          <div className="flex flex-col items-center gap-2 lg:w-1/3 lg:items-start lg:gap-4">
            <div className="text-lg font-bold lg:text-xl">ABOUT US</div>
            <div className="italic text-accent-grey lg:text-lg">
              At Remix Expanse, we are dedicated to revolutionizing financial
              services. Through innovation and expertise, we empower our clients
              to achieve their goals, redefining possibilities in finance.
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 lg:items-start lg:gap-4">
            <div className="text-lg font-bold lg:text-xl">SUPPORT</div>
            <div className="flex flex-col items-center gap-1 text-accent-grey lg:items-start lg:text-lg">
              <div>Tech Support</div>
              <div>Documentation</div>
              <div>FAQ</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 lg:items-start lg:gap-4">
            <div className="text-lg font-bold lg:text-xl">SOCIAL CONNECT</div>
            <div className="flex items-center justify-center gap-3">
              <img src={FacebookIcon} alt="facebook" className="h-6 w-6" />
              <img src={TwitterIcon} alt="twitter" className="h-6 w-6" />
              <img src={LinkedinIcon} alt="linkedin" className="h-6 w-6" />
              <img src={TiktokIcon} alt="tiktok" className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm italic text-white lg:text-base">
          © 2024 Remix Expanse. All rights reserved. Unauthorized reproduction
          of any content on this site is prohibited.
        </div>
      </div>
    </div>
  );
}
