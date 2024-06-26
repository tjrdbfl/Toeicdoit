import MyPageBtn from '@/components/button/MyPageBtn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ModifyProfileBtn=()=>{
    return(<>
    <div className='flex flex-col'>
                <AccountCircleIcon className='text-[120px] text-black' />
                <div className='mt-[5%]' />
                <MyPageBtn label={'프로필 수정'} style={''} />
            </div>
    </>);
}
export default ModifyProfileBtn;