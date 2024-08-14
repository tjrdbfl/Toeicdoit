import ChatModal from '../../components/chat/ChatModal';
import ChatCloseBtn from '../../components/button/ChatCloseBtn';
import ChatRoomHeader from '../../components/chat/ChatRoomHeader';
import { ChatRoomData } from '@/types/ChatData';
import { findRoomById } from '@/service/chat/actions';
import { handleError } from '@/service/utils/error';
import PopOverOption from '@/components/chat/PopOverOption';
import { drawer } from '@/constants/chat/constant';
import ChatDrawer from '@/components/chat/ChatDrawer';
import ChatRoom from './ChatRoom';
import { cookies } from 'next/headers';
import { countUniqueElements } from '@/service/utils/utils';

const ChatContentContainer = async({
    roomId
}:{
    roomId:string
}) => {

    let room:ChatRoomData={
        id: '',
        title: '',
        roomCategories: [],
        adminIds: [],
        memberIds: [],
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const accessToken=cookies().get('accessToken')?.value;

    try{
        const response=await findRoomById(roomId);
        if(response.message==='SUCCESS'){
            room=response.data;
        }else{
            handleError(response.message);
        }
        
    }catch(err){
        console.log(err);
    }

   
    return (<>
    <ChatModal>
    <div
            className="bg-blue-100 w-[450px] h-[650px] shadow-lg border-slate-200 border-2 p-5"
        >
            <div className='flex flex-row justify-between gap-x-5'>
            <ChatRoomHeader
                        room={room}
                    />
                <div className='flex flex-col justify-between'>
                   <ChatCloseBtn/>
                   <ChatDrawer room={room}/>
                </div>


            </div>
            <ChatRoom roomId={roomId} token={accessToken} />
        </div> 
    </ChatModal>

    </>);
}
export default ChatContentContainer;