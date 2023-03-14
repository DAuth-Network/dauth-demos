import React, { FC } from 'react'
import ReactJson from 'react-json-view'
interface IJsonItem {
    item: any
}
const JsonItem: FC<IJsonItem> = ({ item }) => {
    return (
        <div>  <div>
            {"// Authentication payload #0"}
        </div>
            <ReactJson src={item} theme={'twilight'} displayDataTypes={false} displayObjectSize={false} name={false} />
        </div>
    )
}

export default JsonItem