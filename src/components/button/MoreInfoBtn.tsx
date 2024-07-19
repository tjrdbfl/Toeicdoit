import { reviews } from "@/constants/styles/dashboard";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import Link from "next/link";
import ForwardIcon from '@mui/icons-material/Forward';
import { PG } from "@/constants/enums/PG";

export const MoreInfoBtn=()=>(<>
 <motion.div
   variants={fadeIn('up', 'spring', (reviews.length+1) * 0.5, 1)}
   className='mt-[2%] flex justify-center'
 >
    
       <Link href={`${PG.FREE}`}
       className='font-semibold flex justify-center items-center bg-black text-xl text-white w-[250px] h-[50px] pl-4 py-7 text-center shadow-3xl rounded-xl hover:bg-zinc-800 ring-4 ring-blue-100 md:mt-[3%]'>
    <div className="flex flex-row justify-center items-center">
    더 많은 정보 보기
    <ForwardIcon className="text-white h-10 w-10 ml-3"/>
    </div>
       
       </Link>
    
   </motion.div>
</>);