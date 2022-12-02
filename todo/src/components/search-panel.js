import React from 'react'

const SearchPanel = () => {

    const searchText = 'Type here to search'
    const searchStyle = {
        fontSize: '25px'
    }

    return <input
        placeholder={searchText}
        className={searchStyle}
    />
}

export default SearchPanel