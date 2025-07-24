import bgImg from "../assets/img/bg_img.webp";
import logo from "../assets/img/logo.png";

const Welcome = ({ setScreen }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="relative z-10 max-h-screen flex items-center justify-center p-4">
        <div className="bg-[#00000090] p-8 md:p-12 text-white text-center max-w-2xl w-full">
          <h1 className="text-2xl md:text-3xl font-light mb-4">WELCOME TO</h1>

          <div>
            <div className="text-white inline-block opacity-100 z-50 bg-white object-cover">
              <img src={logo} alt="" width={150} height={150} />
            </div>
          </div>

          <h2 className="text-3xl md:text-3xl font-light mt-3">
            CABINET VISUALIZER
          </h2>

          <p className="text-xl my-4">Here is what you can do here:</p>

          <div className="max-w-fit text-center m-auto space-y-1">
            <div className="flex items-start">
              <span className="text-white mr-3">•</span>
              <span>View different cabinet layouts for various rooms</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-3">•</span>
              <span>
                Change the color of the cabinets, counters, backsplash and more
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-3">•</span>
              <span>Save your design and share it with a friend</span>
            </div>
          </div>

          <p className="text-xl my-3">
            Come see all of the different options we can offer you!
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
