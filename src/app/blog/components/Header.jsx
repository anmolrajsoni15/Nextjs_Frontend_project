'use client'

const Header = () => {
  return (
    <div className='w-full h-[50vh] bg-header-image bg-no-repeat bg-cover bg-center flex mt-10 md:mt-0 lg:mt-0'>
        <div className="w-full p-5 absolute flex flex-col items-start md:items-center justify-center top-[15%] md:top-[32%] lg:top-[35%] xl:top-[28%] left-1/2 -translate-x-1/2 gap-6">
            <h1 className="text-start md:text-center font-inter font-semibold text-4xl leading-10 lg:text-5xl lg:leading-[60px]">Resources and Playbooks</h1>
            <p className='text-start md:text-center text-base leading-5 xl:text-xl xl:leading-6 font-spacegrotesk font-medium'>The latest industry news, interviews, technologies, and resources.</p>
        </div>
    </div>
  )
}

export default Header