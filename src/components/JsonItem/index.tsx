import React, { FC } from 'react'
import loadable from '@loadable/component';
const ReactJson = loadable(() => import('react-json-view'));

interface IJsonItem {
    item: any
}
const JsonItem: FC<IJsonItem> = ({ item }) => {
    return (
        <div>  <div>
        </div>
            <ReactJson src={item} theme={'twilight'} displayDataTypes={false} displayObjectSize={false} name={false} collapseStringsAfterLength={25} />
        </div>
    )
}

export default JsonItem