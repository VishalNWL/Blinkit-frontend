import React, { useEffect, useState } from 'react'
import { FaSearch, FaArrowLeft } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useMobile from '../../hooks/useMobile';

function Search({ onClickSearch }) {
  const location = useLocation();
  const [isMobile] = useMobile();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const params = useLocation();
  const searchText=params.search.slice(3)

  const navigate = useNavigate();

  useEffect(() => {
    const isSearch = location.pathname === '/search';
    setIsSearchPage(isSearch);
  }, [location]);

  const handleClick = () => {
    if (!isSearchPage) {
      // navigate whether it's desktop or mobile
      if (onClickSearch) onClickSearch();
      else navigate('/search');
    }
  };

  const handleOnChange=(e)=>{
    const value= e.target.value;
    const url = `/search?q=${value}`
    navigate(url)
  }

  return (
    <div
      className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 cursor-pointer'
      onClick={handleClick}
    >
      {
        (isMobile && isSearchPage) ? (
          <Link to='/' className='flex justify-center items-center p-2 text-neutral-600 group-focus-within:text-primary-200 bg-white rounded-[50%]'>
            <FaArrowLeft />
          </Link>
        ) : (
          <div className='flex justify-center items-center h-full p-3 text-neutral-600 group-focus-within:text-primary-200'>
            <FaSearch size={20} />
          </div>
        )
      }

      {
        isSearchPage ? (
          <div className='w-full h-full flex items-center'>
            <input
              type='text'
              placeholder='Search for all your groceries'
              style={{ outline: 'none', width: '100%', height: '100%', padding: '3px', backgroundColor: '#f8fafc' }}
              autoFocus
              defaultValue={searchText}
              onChange={handleOnChange}
            />
          </div>
        ) : (
          <div className="pl-1 text-neutral-400 text-sm truncate">
            <TypeAnimation
              sequence={[
                'Search "milk"', 1000,
                'Search "sugar"', 1000,
                'Search "paneer"', 1000,
                'Search "bread"', 1000,
                'Search "chocolate"', 1000,
                'Search "rice"', 1000,
                'Search "chips"', 1000,
                'Search "curd"', 1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        )
      }
    </div>
  );
}

export default Search;
