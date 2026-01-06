import bgImg from "../assets/img/bg_img.jpg";

const Shape = ({
  shapes,
  handleNextKitchenShape,
  handlePrevKitchenShape,
  setScreen,
  setSelectedKitchenShapeId,
}) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 "></div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#00000090]  p-8 md:p-12 text-white text-center max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-light mb-12">
            WHAT IS YOUR INTENDED KITCHEN SHAPE?
          </h2>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8 px-12">
              {shapes.map((shape, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if(!shape?.subitems?.length)return;
                    setSelectedKitchenShapeId(shape.id);
                    setScreen("availableItems");
                  }}
                  className="cursor-pointer group hover:scale-125 transition-transform duration-300"
                >
                  <div className="bg-white p-2 mb-3 hover:shadow-lg transition-shadow">
                    <img
                      src={shape.thumbnail}
                      alt={shape.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <h3 className="text-white text-lg font-medium group-hover:text-gray-300 transition-colors">
                    {shape.name}
                  </h3>
                </div>
              ))}
            </div>

            <button
              onClick={handleNextKitchenShape}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 p-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 md:h-12 md:w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handlePrevKitchenShape}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 p-4 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 md:h-12 md:w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="p-1 md:p-2 rounded-full border-2  transition-colors duration-200"
              onClick={() => setScreen("spaceType")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shape;
