import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
  
    const debouncedSearch = debounce((term: string) => {
      if (term.trim() !== '') {
        router.push(`/search/${encodeURIComponent(term)}`);
      }
    }, 500);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchTerm(value);
    };
  
    // Debounce the handleChange function to delay search execution
    const debouncedHandleChange = debounce((value: string) => {
     // debouncedSearch(value);
    }, 1000);
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (searchTerm.trim() !== '') {
        router.push(`/search/${encodeURIComponent(searchTerm)}`);
      }
    };
  

  return (
    <form onSubmit={handleSubmit} className="bg-base-200 pl-4 pr-3 py-2 rounded-md sm:flex items-center gap-4 ">
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => {
          handleChange(event);
          debouncedHandleChange(event.target.value);
        }}
        className="outline-none text-base-content bg-base-200 w-32 placeholder:font-work p-2" // Boyutları ve iç içe geçme düğmesinden yeterince boşluk bırakmak için padding eklendi
        placeholder="Search"
        aria-label="Search"
      />
      <button type="submit" aria-label="Submit Search" className="p-2"> {/* Düğme boyutları artırıldı ve etraflarına boşluk bırakmak için padding eklendi */}
        <svg
          className="cursor-pointer  "
          width="16" // Düğme boyutları artırıldı
          height="16" // Düğme boyutları artırıldı
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.90906 2C5.93814 2 4.98903 2.28791 4.18174 2.82733C3.37444 3.36674 2.74524 4.13343 2.37368 5.03045C2.00213 5.92746 1.90491 6.91451 2.09433 7.86677C2.28375 8.81904 2.75129 9.69375 3.43783 10.3803C4.12438 11.0668 4.99909 11.5344 5.95135 11.7238C6.90362 11.9132 7.89067 11.816 8.78768 11.4444C9.6847 11.0729 10.4514 10.4437 10.9908 9.63639C11.5302 8.8291 11.8181 7.87998 11.8181 6.90906C11.818 5.60712 11.3008 4.35853 10.3802 3.43792C9.45959 2.51731 8.211 2.00008 6.90906 2Z"
            stroke="#52525B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
          <path
            d="M10.5715 10.5716L14 14"
            stroke="#52525B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;
