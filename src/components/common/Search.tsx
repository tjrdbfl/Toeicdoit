'use client';
import SearchIcon from '@mui/icons-material/Search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search=({placeholder}:{
    placeholder:string
})=>{

    const searchParams=useSearchParams();
    const pathname=usePathname();
    const {replace}=useRouter();

    function handleSearch(term:string){
        const params=new URLSearchParams(searchParams);
        
        if(term){
            params.set('query',term);
        }
        else{
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return(<>
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="bg-white shadow-md w-[500px] rounded-3xl border-slate-200 border-2 py-[13px] px-[52px] text-black text-lg placeholder:text-gray-500
        hover:border-[#5AB2FF] focus:border-[#5AB2FF] "
        placeholder={placeholder}
        onChange={(e)=>{handleSearch(e.target.value);}}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <SearchIcon className="text-[#5AB2FF] text-4xl absolute ml-3 mt-3"/>
    </div>
    </>);
}
export default Search;