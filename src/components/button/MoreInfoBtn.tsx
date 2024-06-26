import { reviews } from "@/constants/styles/dashboard";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import Link from "next/link";
import ForwardIcon from '@mui/icons-material/Forward';

export const MoreInfoBtn=()=>(<>
 <motion.div
   variants={fadeIn('up', 'spring', (reviews.length+1) * 0.5, 1)}
   className='mt-[2%] flex justify-center'
 >
    
       <Link href={'/board'}
       className='bg-black text-2xl text-white w-[350px] h-[80px] pl-4 py-5 text-center shadow-3xl rounded-xl hover:bg-zinc-800 ring-8 ring-blue-100 md:mt-[3%]'>
    <div className="flex flex-row justify-center items-center">
    더 많은 정보 보기
    <ForwardIcon className="text-white h-10 w-10 ml-3"/>
    </div>
       
       </Link>
    
   </motion.div>
</>);