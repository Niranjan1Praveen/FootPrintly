import Image from "next/image";
const Flowchart = () => {
  const flowChartData = [
    {
      img: "/badges/beginner.svg",
      alt: "Icon 1",
      title: "Beginner",
      className: "bg-cyan-500",
    },
    {
      img: "/badges/explorer.svg",
      alt: "Icon 2",
      title: "Eco Explorer",
      className: "bg-purple-400",
    },
    {
      img: "/badges/learner.svg",
      alt: "Icon 3",
      title: "Eco Learner",
      className: "bg-red-300",
    },
    {
      img: "/badges/warrior.svg",
      alt: "Icon 4",
      title: "Eco Warrior",
      className: "bg-yellow-200",
    },
  ];

  return (
    <div className="relative text-center overflow-hidden section-p">
      {/* Floating bubbles */}
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`absolute rounded-full opacity-30 animate-float bubble-${
            index + 1
          }`}
        ></div>
      ))}

      <div className="flex gap-8 justify-center mt-16 relative z-10 flex-wrap">
        {flowChartData.map((item, id) => (
          <div key={id} className="flex flex-col items-center w-40 relative">
            <div
              className={`w-[120px] h-[120px] rounded-full flex justify-center items-center shadow-md transform transition duration-300 hover:scale-110 ${item.className}`}
            >
              <img src={item.img} alt={item.alt} width={90} height={90} />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flowchart;
