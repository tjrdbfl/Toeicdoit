const BoardLoading=()=>{
    return(<>
    <div className="md:hidden">
            <div className="flex flex-col gap-y-12">
                <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
                <div className="mt-2 h-5 w-40 rounded-md bg-gray-200" />
                <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
                <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
                </div>
                </div>

            <div className="md:flex md:flex-row md:items-center md:justify-between md:border-b md:border-gray-100 md:py-4 md:pl-5 md:pr-16 lg:pr-24 xl:pr-40 2xl:pr-52">
                <div className="md:flex md:items-center md:gap-x-8 lg:gap-x-16 xl:gap-x-32 2xl:gap-x-28 xl:ml-10 2xl:mx-16">
                <div className="md:mt-2 md:h-4 md:ml-6 md:w-12 md:rounded-md md:bg-gray-200" />
                <div className="md:mt-2 md:h-5 md:w-32 lg:w-48 md:rounded-md md:bg-gray-200" />
                </div>
                <div className="mmd:mt-2 md:h-4 md:w-16 lg:w-32 md:rounded-md md:bg-gray-200" />
                <div className="mmd:mt-2 md:h-4 md:w-16 lg:w-40 md:rounded-md md:bg-gray-200" />
            </div>
    </>);
}
export default BoardLoading;