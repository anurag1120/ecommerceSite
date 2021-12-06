import React from 'react'
import Navigation from './Navigation';

const Base = ({title="Hello There!!",description="Best tshirts are available here",className="bg-dark text-white p-4",children}) => {
    return (
        <div>
            <Navigation/>
            <div className="container-fluid jumbotron text-center bg-success font-weight-italic">
                    <h2 className="display-4 ">{title}</h2>
                    <p className="lead ">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    );
}

export default Base ;
