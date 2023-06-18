import Image from "next/image"

const Brand = ({ ...props }) => (
    <>
    <div className="relative md:h-9 md:w-9 h-6 w-6">
    <Image
        className="object-cover"
        src="landing_images/bloc_logo.svg"
        alt="bloc logo"
        {...props}
        fill
        priority
    />
    </div>

    <h1 className="text-white md:text-xl text-base">
        Bloc
    </h1>
    </>
)
export default Brand