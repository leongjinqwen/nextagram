import React from 'react';
import loading from './loading.gif';

export default class LoadIndicator extends React.Component {
    
    render(){
        const {isLoading} = this.props;
        return (
            <>
                {isLoading ? <img src={loading} alt='Loading'className={'mx-auto d-block'}/> : null} 
            </>
        )
    }
}