import bgImg from "../assets/img/bg_img.webp";
import logo from "../assets/img/logo.png";

const Welcome = ({setCurrentStep}) => {
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative "
            style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="relative z-10 max-h-screen flex items-center justify-center p-4 ">
                <div className="bg-[#00000090] p-8 md:p-12 text-white text-center max-w-2xl w-full">
                    <h1 className="text-2xl  md:text-3xl font-light mb-4">WELCOME TO</h1>

                    <div>
                        <div className=" text-white inline-block opacity-100 z-50 bg-white object-cover">
                            <img src={logo} alt="" width={150} height={150} />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-3xl font-light mt-3">ROOM VISUALIZER</h2>

                    <p className="text-xl my-4">Here is what you can do here:</p>

                    <div className="max-w-fit text-center m-auto space-y-1">
                        <div className="flex items-start">
                            <span className="text-white mr-3">•</span>
                            <span>View different cabinet layouts for various rooms</span>
                        </div>
                        <div className="flex items-start">
                            <span className="text-white mr-3">•</span>
                            <span>Change the color of the cabinets, counters, backsplash and more</span>
                        </div>
                        <div className="flex items-start">
                            <span className="text-white mr-3">•</span>
                            <span>Save your design and share it with a friend</span>
                        </div>
                    </div>

                    <p className="text-xl my-6 ">Come see all of the different options we can offer you!</p>

                    <button
                        onClick={() => setCurrentStep('space')}
                        className="border-3 border-white bg-transparent text-white px-10 py-5 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300"
                    >
                        GET STARTED
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Welcome