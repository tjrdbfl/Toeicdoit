import LinkIcon from "@/components/common/LinkIcon";

const ToeicHeader = ({label}:{label:string}) => {
    return (<>
        <div className='bg-white gap-x-2 flex flex-row w-full py-2 px-5 items-center lg:px-[25%]'>
            <LinkIcon size={20}/>
            <p className='text-black text-[18px] font-semibold mt-1 w-[250px]'>{label}</p>
        </div>
    </>);
}
export default ToeicHeader;