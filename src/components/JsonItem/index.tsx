import React, {FC} from 'react'
import loadable from '@loadable/component';
import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {testContractAddress} from "@/services/contracts/zkContact";
import {keccak256} from "viem";
import {ethers, utils} from "ethers";

const ReactJson = loadable(() => import('react-json-view'));


interface IJsonItem {
    item: any
}

const JsonItem: FC<IJsonItem> = ({item}) => {

    return (
        <div>
            <div className='react-json-view'>
                <ReactJson src={item} theme={'twilight'} displayDataTypes={false} displayObjectSize={false}
                           name={false}/>

            </div>
        </div>
    )
}

export default JsonItem