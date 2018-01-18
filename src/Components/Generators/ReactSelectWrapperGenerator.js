/*  [Status] Untest
*   Last Updated: 2018-01-18 13:50:30
*/

import React from 'react';
import Select, { Async, Creatable, AsyncCreatable } from 'react-select';

const RSelectWG = (themeName) => {
    const ReactSelectWrapper = ({className, ...props}) => (
        <Select
            {...props}
            className={`${themeName} react-select-wrapper ${className}`}
        />
    )
    return ReactSelectWrapper;
}

export const RSelectAsyncWG = (themeName) => {
    const ReactAsyncSelectWrapper = ({ className, ...props }) => (
        <Async
            {...props}
            className={`${themeName} react-select-wrapper async ${className}`}
        />
    )
    return ReactAsyncSelectWrapper;
}

export const RSelectCreateableWG = (themeName) => {
    const ReactCreateableSelectWrapper = ({ className, ...props }) => (
        <Creatable
            {...props}
            className={`${themeName} react-select-wrapper async ${className}`}
        />
    )
    return ReactCreateableSelectWrapper;
}

export const RSelectAsyncCreatablecWG = (themeName) => {
    const ReactSelectAsyncCreatableWrapper = ({ className, ...props }) => (
        <AsyncCreatable
            {...props}
            className={`${themeName} react-select-wrapper async ${className}`}
        />
    )
    return ReactSelectAsyncCreatableWrapper;
}

export default RSelectWG; 