import GradientWrapper from "../../GradientWrapper"
import Image from "next/image"
import NavLink from "../NavLink"
import HeroImg from "public/images/hero.svg"
import LayoutEffect from "../../LayoutEffect"
import Link from "next/link"

const Hero = () => (
    <section>
        <div className="custom-screen py-28">
            <LayoutEffect className="duration-1000 delay-300"
                isInviewState={{
                    trueState: "opacity-1",
                    falseState: "opacity-0"
                }}
            >
                <div>
                    <div className="space-y-5 max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl"
                            style={{
                                backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)"
                            }}
                        >
                            {/* Everything your team needs to know
                            Just a question away. */}
                            Your knowledgebase to Chat... in 2 Minutes.
                        </h1>
                        <p className="max-w-xl mx-auto text-gray-300">
                            Bloc is an AI tool that allows you to extract data from your resources through simple questions, so that you can focus on what&apos;s really important - your work.
                        </p>
                        <Link href={'https://nsbxei0ai38.typeform.com/to/fd3UK76K'}>
                        <div className="flex justify-center font-medium text-sm">
                            <div className="  my-4 border rounded-full sm:py-2 py-2 w-fit sm:px-6 px-4
                            flex flex-row items-center bg-[#28A1FF] border-gray-600 hover:border-[#85BCE5] cursor-pointer">
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
                    
                    <GradientWrapper className="mt-16 sm:mt-28" wrapperClassName="max-w-3xl h-[250px] top-12 inset-0 sm:h-[300px] lg:h-[650px]">
                        <Image
                            src={HeroImg}
                            className="shadow-lg rounded-2xl"
                            alt="Mailgo"
                        />
                    </GradientWrapper>
                </div>
            </LayoutEffect>
        </div>
    </section>
)

export default Hero