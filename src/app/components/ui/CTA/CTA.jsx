import GradientWrapper from "../../GradientWrapper"
import Image from "next/image"
import NavLink from "../NavLink"
import bgPattern from "public/images/bg-pattern.webp"
import LayoutEffect from "../../LayoutEffect"
import Link from "next/link"

const CTA = () => (
    <section>
        <GradientWrapper wrapperClassName="max-w-xs h-[13rem] top-12 inset-0">
            <div className="custom-screen py-28 relative">
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1",
                        falseState: "opacity-0 translate-y-6"
                    }}
                >
                    <div className="relative z-10">
                        <div className="max-w-xl mx-auto text-center">
                            <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                                Empower Everyone.                          </h2>
                            <p className="mt-5 text-gray-300">
                                Bloc is the perfect answer! It converts your entire knowledge base into GPT 3 driven AI Chat in minutes. Bloc lets everyone, not just data wizards, tackle their data with AI-driven insights. With Bloc, your teams can work together to move faster and make confident, transparent decisions.
                            </p>
                        </div>
                        <Link href={'https://nsbxei0ai38.typeform.com/to/fd3UK76K'}>
                        <div className="mt-5 flex justify-center font-medium text-sm opacity-80">
                            <div className="  my-4 border rounded-full sm:py-2 py-2 w-fit sm:px-6 px-4
                                              flex flex-row items-center bg-[#28A1FF] border-gray-600 
                                              hover:border-[#28A1FF] cursor-pointer">
                                {/* <div className="h-6 w-6 sm:w-8 sm:h-8 relative">
                                    <Image src="landing_images/google.svg"
                                        alt="Google Logo"
                                        className='object-cover'
                                        fill
                                    />
                                </div>
                                <div className="sm:w-4 w-2">  </div> */}
                                <div className="sm:font-medium text-base " > Join the Waitlist </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                </LayoutEffect>
                <Image
                    src={bgPattern}
                    className="w-full h-full object-cover m-auto absolute inset-0 pointer-events-none"
                    alt="Background pattern"
                />
            </div>
        </GradientWrapper>
    </section>
)

export default CTA