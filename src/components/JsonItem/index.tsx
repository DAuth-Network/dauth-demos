import React, { FC } from 'react'
import loadable from '@loadable/component';
const ReactJson = loadable(() => import('react-json-view'));

interface IJsonItem {
    item: any
}
const JsonItem: FC<IJsonItem> = ({ item }) => {
    return (
        <div>
            <div className='react-json-view'>
                <ReactJson src={item} theme={'twilight'} displayDataTypes={false} displayObjectSize={false} name={false}  />

            </div>
        </div>
    )
}

export default JsonItem