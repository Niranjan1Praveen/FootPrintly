import Image from "next/image";
import seo1 from "../../public/seo/2.svg";
import seo2 from "../../public/seo/3.svg";
import seo3 from "../../public/seo/4.svg";

function Seo(props) {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-16 px-4">
      {[ 
        { image: seo1, title: "From Eco Explorer to Eco Warrior", text: "Step into a world where sustainability meets ingenuity. Our app turns daily habits into a canvas of change, empowering you to shape the future with every eco-friendly action.", reverse: false },
        { image: seo2, title: "Build a Greener Future, One Challenge at a Time", text: "FootPrintly transforms routine sustainability into an art form. With gamified challenges and intuitive design, every choice is an opportunity to innovate your lifestyle. Think differently, live beautifully.", reverse: true },
        { image: seo3, title: "Embark on Your Green Quest Today", text: "Revolutionize your green journey with innovation at its core. With every challenge, earn rewards and build a streak of sustainability that’s uniquely yours. Embrace the future of eco living.", reverse: false }
      ].map((item, index) => (
        <div 
          key={index} 
          className={`flex flex-col md:flex-row ${item.reverse ? 'md:flex-row-reverse' : ''} items-center justify-between gap-8 md:gap-16 mb-16`}
        >
          <div className="flex flex-col max-w-lg gap-3 text-center md:text-left">
            <h1 className="text-[#1CB0F6] text-2xl md:text-3xl font-bold">
              {item.title}
            </h1>
            <p className="text-black text-base md:text-lg">
              {item.text}
            </p>
          </div>
          <Image src={item.image} width={300} height={300} alt="hero-image" className="w-64 h-64 md:w-96 md:h-96" />
        </div>
      ))}
    </div>
  );
}

export default Seo;
