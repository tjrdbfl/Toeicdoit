import LinkIcon from "../common/LinkIcon";

const StudyHeader = ({label}:{label:string}) => {
  return (
    <>
      <div className="flex flex-row items-center gap-x-2">
        <LinkIcon size={20} />
        <h1 className="text-black font-medium text-start text-lg">
          {label}
        </h1>
      </div>
    </>
  );
};
export default StudyHeader;
