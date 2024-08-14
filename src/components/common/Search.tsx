'use client';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search = ({ placeholder }: {
  placeholder: string
}) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('search', term);
    }
    else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (<>
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="bg-white flex items-center shadow-md w-[400px] sm:w-[500px] rounded-3xl border-slate-200 border-2 py-3 px-[48px] text-black text-[16px] placeholder:text-gray-500
        hover:border-[var(--blue2)] focus:border-[var(--blue2)] "
        placeholder={placeholder}
        onChange={(e) => { handleSearch(e.target.value); }}
        defaultValue={searchParams.get('search')?.toString()}
      />
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <Image loading="lazy"
          src={'svgs/icons/search-icon.svg'}
          alt={'search-icon'}
          width={23}
          height={23}
        />
      </div>
    </div>
  </>);
}
export default Search;