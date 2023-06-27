import SectionWrapper from "../../SectionWrapper"
import GradientWrapper from "../../GradientWrapper"
import user1 from "public/testimonial/user1.webp"
import user2 from "public/testimonial/user2.webp"
import user3 from "public/testimonial/user3.webp"
import user4 from "public/testimonial/user4.webp"
import user5 from "public/testimonial/user5.webp"
import user6 from "public/testimonial/user6.webp"
import Image from "next/image"
import LayoutEffect from "../../LayoutEffect"

const Testimonial = () => {

    const testimonials = [
        {
            avatar: user1,
            name: "Tom Harry",
            title: "Founder of Senses",
            quote: "Our team has been using Bloc for a few days now, and we've found it to be a game-changer. With Bloc's easy-to-use interface and natural language processing capabilities, accessing all of our knowledge has never been easier. It saves us so much time and makes our work more efficient."
        },
        {
            avatar: user2,
            name: "Gluman desk",
            title: "Founder of Vernit",
            quote: "I have to say, I was a bit skeptical about Bloc at first, but after using it for a few days, I'm a believer. The ability to ask simple questions and get immediate answers from our company's knowledge base has been a game-changer. Bloc has definitely made our work easier and faster."
        },
        {
            avatar: user3,
            name: "Sedal Johnson",
            title: "Founder of Flurry",
            quote: "As a manager, I'm always looking for ways to improve our team's productivity, and Bloc has been a great addition to our toolbox. It's so intuitive and easy to use, and it has made accessing our company's knowledge base a breeze. The natural language processing capabilities of Bloc are impressive and the platform is always improving. I love it!"
        },
        {
            avatar: user4,
            name: "Gary Shark",
            title: "Founder of Fortee",
            quote: "I've been managing teams for years, and I have to say, Bloc is one of the best tools I've ever used. It has made accessing our company's knowledge base so much easier, and it saves us so much time. The platform is incredibly user-friendly, and the natural language processing is impressive. I highly recommend Bloc to any manager who wants to improve their team's workflow."
        },
        {
            avatar: user5,
            name: "Ana Lee",
            title: "Founder of Lebix",
            quote: "Bloc impressed us with its impact on our team's efficiency. It's user-friendly and flexible, allowing us to upload various files and quickly find what we need. It's been a fantastic addition to our toolbox, and I highly recommend it to any manager looking to streamline their workflow."
        },
        {
            avatar: user6,
            name: "Loren smith",
            title: "Founder of Subspot",
            quote: "Bloc is incredibly useful for our customer support team. Its natural language processing capabilities allow us to quickly access the information we need to help customers. With the ability to upload various files and documents, we find answers to questions fast. Bloc increased our team's efficiency and productivity, and it's a great addition to our workflow. I recommend Bloc to any customer support manager who wants to improve their team's productivity and customer satisfaction."
        },
    ]

    return (
        <SectionWrapper id="testimonials">
            <div  className="custom-screen text-gray-300">
                <div className="max-w-2xl text-center md:mx-auto">
                    <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Bloc is loved by managers Everywhere!
                    </h2>
                </div>
                <GradientWrapper wrapperClassName="max-w-sm h-40 top-12 inset-x-0" className="mt-12">
                    <LayoutEffect
                        className="duration-1000 delay-300"
                        isInviewState={{
                            trueState: "opacity-1",
                            falseState: "opacity-0 translate-y-12"
                        }}
                    >
                        <ul className="grid gap-6 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
                            {
                                testimonials.map((item, idx) => (
                                    <li key={idx} className="p-4 rounded-xl border border-gray-800"
                                        style={{
                                            backgroundImage: "radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)"
                                        }}
                                    >
                                        <figure className="flex flex-col justify-between gap-y-6 h-full">
                                            <blockquote className="">
                                                <p className="">
                                                    {item.quote}
                                                </p>
                                            </blockquote>
                                            <div className="flex items-center gap-x-4">
                                                <Image
                                                    src={item.avatar}
                                                    alt={item.name}
                                                    className="w-14 h-14 rounded-full object-cover"
                                                />
                                                <div>
                                                    <span className="block text-gray-50 font-semibold">{item.name}</span>
                                                    <span className="block text-sm mt-0.5">{item.title}</span>
                                                </div>
                                            </div>
                                        </figure>
                                    </li>
                                ))
                            }
                        </ul>
                    </LayoutEffect>
                </GradientWrapper>
            </div>
        </SectionWrapper>
    )
}

export default Testimonial