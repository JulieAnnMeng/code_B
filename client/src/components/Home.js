import { useState, useEffect } from 'react';
import {Switch, Route} from 'react-router-dom';


function Home() {

    return (
        <div className="home">
            <h2>Welcome to Code <span>B</span></h2>
            <p className='home-txt'>
                A forum for all coding discussions, where users can interact with each other and continue their education in programming.
            </p>
        </div>
    )
}

export default Home;