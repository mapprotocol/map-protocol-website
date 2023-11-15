import * as React from 'react';
import HomePageTop from './top';
import ColorsContent from './colors-content';
import Data from './data';


export default function HomePage({ imageArray }: { imageArray: number[] }) {

    return (<>
        <HomePageTop imageArray={imageArray}/>
        <ColorsContent />
        <Data />
    </>
    );
}

