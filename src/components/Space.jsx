import bgImg from "../assets/img/bg_img.webp";
import kitchen from "../assets/img/kitchen.webp";
import baaroom from "../assets/img/barroom.webp";
import laundry from "../assets/img/laundry.webp";
import mediaroom from "../assets/img/tvroom.webp";
import bathroom from "../assets/img/bathroom.webp";
import office from "../assets/img/office.webp";
import { useState } from "react";

const spaceTypes = [
    { name: 'Kitchen', image: kitchen },
    { name: 'Bathroom', image: bathroom },
    { name: 'Bar Room', image: baaroom },
    { name: 'Laundry', image: laundry },
    { name: 'Office', image: office },
    { name: 'Media Room', image: mediaroom }
];

const Space = ({ setCurrentStep, setSelectedSpace }) => {
    const [spaceIndex, setSpaceIndex] = useState(0);

    const nextSpaces = () => {
        setSpaceIndex((prev) => (prev + 4 >= spaceTypes.length ? 0 : prev + 4));
    };

    const prevSpaces = () => {
        setSpaceIndex((prev) => (prev - 4 < 0 ? Math.max(0, spaceTypes.length - 4) : prev - 4));
    };
    const handleSpaceSelect = (spaceName) => {
        setSelectedSpace(spaceName);
        setCurrentStep('shape');
    };
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="absolute inset-0"></div>
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="bg-[#00000090] p-8 md:p-12 text-white text-center max-w-5xl w-full">
                    <h2 className="text-2xl md:text-3xl font-light mb-12">WHAT TYPE OF SPACE ARE YOU DESIGNING?</h2>

                    <div className="relative">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-8 px-8">
                            {spaceTypes.slice(spaceIndex, spaceIndex + 4).map((space, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSpaceSelect(space.name)}
                                    className="cursor-pointer group hover:scale-125 transition-transform duration-300"
                                >
                                    <div className="bg-white p-2 mb-3 hover:shadow-lg transition-shadow">
                                        <img
                                            src={space.image}
                                            alt={space.name}
                                            className="w-full h-32 object-cover"
                                        />
                                    </div>
                                    <h3 className="text-white text-lg font-medium group-hover:text-gray-300 transition-colors">
                                        {space.name}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={prevSpaces}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 text-white hover:text-gray-300 transition-colors p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 md:h-12 md:w-12 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSpaces}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 md:h-12 md:w-12 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button className="p-1 md:p-2 rounded-full border-2  transition-colors duration-200" onClick={() => setCurrentStep('welcome')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 md:h-8 md:w-8 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Space