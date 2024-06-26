import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BoardDetailProfile = ({
writer,create,update
}:{
    writer:string;
    create:Date;
    update:Date;
}) => {
    return (<>
        <div className="flex flex-row py-3">
            <AccountCircleIcon className="text-slate-200 text-6xl" />
            <div className="flex flex-col ml-5">
                <h4 className="text-black text-[18px] mb-2">작성자 : {writer}</h4>
                <div className="flex flex-row gap-x-10">
                    <h4 className="text-black text-[18px]">
                        작성일자 : {create ? (
                            <>
                                {new Date().getFullYear() - create.getFullYear()}년 전
                            </>
                        ) : (
                            "No creation date available"
                        )}
                    </h4>
                    <h4 className="text-black text-[18px]">
                        업데이트 시간 : {update ? (
                            <>
                                {new Date().getFullYear() - update.getFullYear()}년 전
                            </>
                        ) : (
                            "No creation date available"
                        )}
                    </h4>
                </div>
            </div>
        </div>

    </>);
}
export default BoardDetailProfile;