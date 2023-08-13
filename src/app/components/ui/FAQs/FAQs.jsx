import LayoutEffect from "../../LayoutEffect"
import SectionWrapper from "../../SectionWrapper"
import GradientWrapper from "../../GradientWrapper"

const faqsList = [
    // {
    //     q: "What is a Bloc? How does it work?",
    //     a: "A Bloc is your knowledge hub. You provide links to your knowledge base. And that's it, you are ready Bloc is ready to answer any questions on it instantly, 24/7. Integrates with Intercom, Notion, Slack and Google Workspace.All without code.",
    // },
    // {
    //     q: " What apps can bloc be integrated with?",
    //     a: "Notion, Slack and Google Workspace as of now. We are constantly trying to add more.",
    // },
    // {
    //     q: "How does Bloc ensure the security of the knowledge uploaded?",
    //     a: "At Bloc, we take the security and privacy of our users' data very seriously. That's why we use encryption to safeguard all vector databases and store them on our own servers. We never send this data to any third-party storage providers, ensuring that our users' confidential information is protected at all times.",
    // },
    // {
    //     q: " How does Bloc work?",
    //     a: "It's really very simple. You make an account, go to create a bloc. Add your knowledge base ( a file, website, or anything) or integrate it with your pre-existing workspace.  And you are good to go! Go ahead and ask any questions from the data source.",
    // },
    // {
    //     q: "Can multiple users access the same Bloc account?",
    //     a: "No, multiple users cannot access the same Bloc Account. But, once a bloc is created, it can be shared to others.",
    // },
    // {
    //     q: "Can Bloc be accessed from mobile devices?",
    //     a: "Yes, bloc can be accessed from mobile devices as well.",
    // },
    {
        q: "What is a Bloc? How does it work?",
        a: "A Bloc is your knowledge hub. You provide links to your knowledge base. And Bloc is ready to answer any questions on it instantly, 24/7.",
    },
    {
        q: " What apps can bloc be integrated with?",
        a: "Bloc can be integrated with a lot of apps, so you never miss anything. Notion, Google Drive, Figma, and Slack, we have it all.",
    },
    {
        q: "How does Bloc ensure the security of the knowledge uploaded?",
        a: "At Bloc, we take the security and privacy of our users' data very seriously. That's why we use encryption to safeguard all vector databases and store them on our own servers. We never send this data to any third-party storage providers.",
    },
    {
        q: " How does Bloc work?",
        a: "It's really very simple. You make an account, go to create a bloc. Add your data or integrate with your pre-existing workspace. And you are good to go! Go ahead and ask any questions.",
    },
    {
        q: "Can multiple users access the same Bloc account?",
        a: "No, multiple users cannot access the same Bloc Account. But, once a bloc is created, it can be shared to others.",
    },
    {
        q: "Can Bloc be accessed from mobile devices?",
        a: "Yes, bloc can be accessed from mobile devices as well.",
    }

]

const FAQs = () => (
    <SectionWrapper id="faqs">
        <div className="mx-auto w-[94%]">
            <div className="w-4/5 text-center mx-auto">
                <h2 className="text-3xl text-white font-semibold font-poppins leading-[44px] sm:text-4xl">
                    Everything you need to know.
                </h2>

                <p className=" mt-3 text-lg font-spacegrotesk font-medium">
                Here are the most frequently asked questions.
                </p>
            </div>
            <GradientWrapper wrapperClassName="max-w-xl h-16 top-[45%] inset-x-0" className="h-fit">
            <div className='mt-12'>
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1",
                        falseState: "opacity-0 translate-y-12"
                    }}
                >
                    <ul className='space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3 w-11/12 mx-auto'>
                        {faqsList.map((item, idx) => (
                            <li
                                key={idx}
                                className="space-y-3 p-5 rounded-md transition duration-300 ease-in-out"
                            >
                                <summary
                                    className="flex items-center justify-between font-semibold text-white font-poppins text-base">
                                    {item.q}
                                </summary>
                                <p
                                    dangerouslySetInnerHTML={{ __html: item.a }}
                                    className='leading-relaxed text-[#666] text-base font-roboto'>
                                </p>
                            </li>
                        ))}
                    </ul>
                </LayoutEffect>
            </div>
            </GradientWrapper>
        </div>
    </SectionWrapper>
)

export default FAQs