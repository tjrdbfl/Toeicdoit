import LinkIcon from "@/components/common/LinkIcon";

const ExamHeader = () => {
    return (<>
        <div className='bg-white gap-x-2 flex flex-row w-full py-2 px-5 items-center lg:px-[25%]'>
            <LinkIcon size={25}/>
            <p className='text-black text-xl font-semibold mt-1 w-[250px]'>토익두잇 실전 모의고사</p>
        </div>
    </>);
}
export default ExamHeader;