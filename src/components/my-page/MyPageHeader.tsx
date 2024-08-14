import LinkIcon from "../common/LinkIcon";

const MyPageHeader = ({label}:{label:string}) => {
  return (
    <>
      <div className="flex flex-row items-center gap-x-2">
        <LinkIcon size={25} />
        <h1 className="text-black font-medium text-start text-xl">
          {label}
        </h1>
      </div>
    </>
  );
};
export default MyPageHeader;
