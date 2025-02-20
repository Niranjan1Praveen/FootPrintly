import Image from "next/image";
import seo1 from "../../public/seo/2.svg"
import seo2 from "../../public/seo/3.svg"
import seo3 from "../../public/seo/4.svg"

function Seo(props) {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-[100px]">
      <div className="flex items-center justify-between gap-[150px]">
        <div className="flex flex-col max-w-[400px] gap-3">
          <h1 className="text-[#1CB0F6] text-[2rem] font-bold">
          From Eco Explorer to Eco Warrior
          </h1>
          <p className="text-black">
          Step into a world where sustainability meets ingenuity. Our app turns daily habits into a canvas of change, empowering you to shape the future with every eco-friendly action.
          </p>
        </div>
        <Image src={seo1} width={400} height={400} alt="hero-image"/>
      </div>

      <div className="flex flex-row-reverse items-center justify-between gap-[150px]">
        <div className="flex flex-col max-w-[400px] gap-3">
          <h1 className="text-[#1CB0F6] text-[2rem] font-bold">
          Build a Greener Future, One Challenge at a Time
          </h1>
          <p className="text-black">
          FootPrintly transforms routine sustainability into an art form. With gamified challenges and intuitive design, every choice is an opportunity to innovate your lifestyle. Think differently, live beautifully.
          </p>
        </div>
        <Image src={seo2} width={400} height={400} alt="hero-image"/>
      </div>

      <div className="flex items-center justify-between gap-[150px]">
        <div className="flex flex-col max-w-[400px] gap-3">
          <h1 className="text-[#1CB0F6] text-[2rem] font-bold">
          Embark on Your Green Quest Today
          </h1>
          <p className="text-black">
          Revolutionize your green journey with innovation at its core. With every challenge, earn rewards and build a streak of sustainability that’s uniquely yours. Embrace the future of eco living.
          </p>
        </div>
        <Image src={seo3} width={400} height={400} alt="hero-image"/>
      </div>
    </div>
  );
}

export default Seo;
