import SectionWrapper from "../../SectionWrapper"
import Feature1 from "public/images/Feature-1.svg"
import Feature2 from "public/images/Feature-2.svg"
import Image from "next/image"

const VisualFeatures = () => {

    const features = [
        {
            title: "Flexible document and file upload",
            desc: "Bloc can be integrated with a lot of apps, so you never miss anything. Notion, Google Drive, Figma and slack we have it all.",
            img: Feature1
        },
        {
            title: "Centralise your knowledge base",
            desc: "Elevate your knowledge management game by having a centralised platform for all your valuable data.",
            img: Feature2
        },
    ]
    return (
        <SectionWrapper>
            <div className="custom-screen text-gray-300">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Don&apos;t look across 10s of Documents, just ask.
                    </h2>
                    <p className="mt-3">
                        Revolutionize Your Team&apos;s Productivity with Q/A. No more Repeat Explanations!
                        {/* The questions you set up can range from simple yes or no questions all the way to advanced mathematical formulas, and you can create as many as needed. */}
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="space-y-8 gap-x-6 sm:flex sm:space-y-0">
                        {
                            features.map((item, idx) => (
                                <li className="flex-1 flex flex-col justify-between border border-gray-800 rounded-2xl" key={idx}
                                    style={{
                                        background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"
                                    }}
                                >
                                    <div className="p-8">
                                        <h3 className="text-gray-50 text-xl font-semibold">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 sm:text-sm md:text-base">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="pl-8">
                                        <Image
                                            src={item.img}
                                            className="w-full ml-auto"
                                            alt={item.title}
                                        />
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default VisualFeatures