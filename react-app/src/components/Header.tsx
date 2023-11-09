import React from 'react'
export interface headerTitle {
    title: string;
}

const Header = (name: headerTitle) => {
    return (
        <>
            <div id='header' className="container-fluid text-center display-5 fw-medium" style={{ height: '4rem', color: '#fff' }}>{name.title}
            </div>
        </>
    )
}

export default Header