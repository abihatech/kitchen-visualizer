import bgImg from "../assets/img/bg_img.jpg";
import logo from "../assets/img/logo.png";

const Welcome = ({ setScreen }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative "
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="relative z-10 max-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-300 p-8 md:p-12 text-center max-w-2xl w-full rounded-4xl text-[#111942]">
          <div>
            <div className=" inline-block opacity-100 z-50 object-cover">
              <img src={logo} alt="" width={180} />
            </div>
          </div>

          <h2 className="text-3xl md:text-3xl font-bold text-[#111942]">
            WELCOME TO CABINET VISUALIZER
          </h2>

          <p className="text-xl my-4 font-bold">Here's what you can do:</p>

          <ul className="list-disc list-inside space-y-1 text-start font-semibold w-4/5 m-auto  ">
            <li className="mb-2">Browse cabinet layouts for different rooms</li>
            <li className="mb-2">Choose from multiple colors of cabinets, countertops, backsplashes, and more</li>
            <li className="mb-2">Share this visualizer with a friend or family member to get their input or just show off your creativity</li>
          </ul>

          <p className="text-2xl font-bold my-3">
            Explore all the options we offer!
          </p>

          {/* Fixed Animated Button */}
          <div className="relative inline-block mt-2">
            <button
              onClick={() => setScreen("spaceType")}
              className="relative overflow-hidden px-14 py-5 text-white group"
              style={{
                WebkitBoxReflect:
                  "below 1px linear-gradient(transparent, transparent, #0004)",
              }}
            >
              {/* Main button background */}
              <span className="absolute inset-0 bg-black/50 group-hover:bg-[#00ccff] transition-all duration-1000"></span>

              {/* Fixed rotating line animation */}
              <span
                className="absolute w-[120%] h-[40px] bg-[#00ccff] transition-all duration-1000 
                                          left-1/2 top-0 -translate-x-1/2 -translate-y-1/2
                                          group-hover:h-[150%]"
                style={{
                  animation: "rotate 3s linear infinite",
                  transformOrigin: "center center",
                }}
              ></span>

              {/* Inner background */}
              <span className="absolute inset-1 bg-[#0e1538] group-hover:bg-[#00ccff] transition-all duration-500"></span>

              {/* Button text */}
              <span className="relative z-10 text-white text-lg uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                GET STARTED
              </span>
            </button>

            {/* Smooth rotation animation */}
            <style>{`
                            @keyframes rotate {
                                0% { transform: translate(0%, 100%) rotate(0deg); }
                                100% { transform: translate(0%,100%) rotate(360deg); }
                            }
                        `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
