import React from 'react';

const Filter = ({ filterString, handleFiltering }) => {
    return (
        <div>
            <input value={filterString} onChange={handleFiltering} />
        </div>
    )
}

export default Filter