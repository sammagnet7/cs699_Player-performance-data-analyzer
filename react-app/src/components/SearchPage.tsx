import Searchbar from './Searchbar'
import { SearchProps } from './Searchbar';
import './SearchPage.css'
const SearchPage = (getSearch: SearchProps) => {
    return (
        <div id='searchBarContainer' className='container d-flex flex-column align-items-center justify-content-center'>
            <Searchbar onDataReceived={getSearch.onDataReceived} />
        </div>
    )
}

export default SearchPage