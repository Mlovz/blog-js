import React from 'react';
import './Loading.scss'
import {useSelector} from "react-redux";

const Loading = () => {
    const isLoading = useSelector(state => state.global.isLoading)

    if(isLoading) {
        return (
            <div className='loading_over'>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return null
};

export default Loading;