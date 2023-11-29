import React, {FC} from 'react'
import loadable from '@loadable/component';
import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {testContractAddress} from "@/services/contracts/zkContact";
import {keccak256} from "viem";
import {ethers, utils} from "ethers";

const ReactJson = loadable(() => import('react-json-view'));
const abiContract = [{
    inputs: [
        {
            components: [
                {
                    internalType: "bytes32",
                    name: "schemaId",
                    type: "bytes32",
                },
                {
                    internalType: "uint64",
                    name: "expirationDate",
                    type: "uint64",
                },
                {
                    internalType: "bytes",
                    name: "subject",
                    type: "bytes",
                },
                {
                    internalType: "bytes",
                    name: "attestationData",
                    type: "bytes",
                },
            ],
            internalType: "struct AttestationPayload",
            name: "attestationPayload",
            type: "tuple",
        },
        {
            internalType: "bytes[]",
            name: "validationPayloads",
            type: "bytes[]",
        },
    ],
    name: "attest",
    outputs: [],
    stateMutability: "payable",
    type: "function",
},,]

interface IJsonItem {
    item: any
}

const JsonItem: FC<IJsonItem> = ({item}) => {
    const {data, write} = useContractWrite({
        address: testContractAddress,
        abi: abiContract,
        functionName: 'attest',
    })


    const {isLoading, isSuccess} = useWaitForTransaction({
        hash: data?.hash,
    })
    const onSubmit = () => {
        const proof = item.data;
        const schemaId = "0x44a18728bda7ce4b5891c75a6e6d316f8d9020453bdf55754e63c1d3a85acee9";
        const expirationDate = '0x'
        const {auth, signature} = proof
        const {acc_and_type_hash, request_id} = auth
        const subject = keccak256(request_id)
        const attestationData = acc_and_type_hash
        const attestationPayload = utils.defaultAbiCoder.encode(
            ["bytes32", "uint64", "bytes", "bytes"],
            [schemaId, expirationDate, subject, attestationData]
        )
        if (write) {
            write({
                args: [attestationPayload, signature]
            })
        }
    }
    return (
        <div>
            <div className='react-json-view'>
                <ReactJson src={item} theme={'twilight'} displayDataTypes={false} displayObjectSize={false}
                           name={false}/>

            </div>
            <button className={`mr-2 w-6 h-6 rounded-full px-1`} onClick={onSubmit}></button>
        </div>
    )
}

export default JsonItem