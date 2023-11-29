import React, {FC, useEffect, useMemo, useState} from 'react'
import {MdHistory} from 'react-icons/md'
import {FaUserAlt} from 'react-icons/fa'
import JsonItem from '../JsonItem'
import Logout from '../Logout'
import {RootState} from '@/store'
import {useSelector} from 'react-redux';
import {Fira_Code} from 'next/font/google'
import {useAccount, useConnect, useContractWrite, useWaitForTransaction} from "wagmi";
import {ContractAddress, testContractAddress} from "@/services/contracts/zkContact";
import {Contract, ethers, utils, Wallet} from "ethers";
import {useEthersSigner} from "@/services/ethers.signer";
import {ConnectButton} from "@rainbow-me/rainbowkit";

interface ISignatureData {
    data: any
}

const firaCode = Fira_Code({subsets: ['latin']})
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
}]
const SignatureData: FC<ISignatureData> = () => {
    const activedItem = useSelector((state: RootState) => state.verifiedData.activedItem)
    const verifyedData = useSelector((state: RootState) => state.verifiedData.verifyedData)
    const [showAll, setShowAll] = useState(false)
    const singer = useEthersSigner()
    const {isConnected} = useAccount()

    const onClick = () => {
        setShowAll(!showAll)
    }
    const {data, writeAsync} = useContractWrite({
        address: testContractAddress,
        abi: abiContract,
        functionName: 'attest',
    })
    const {isLoading, isSuccess} = useWaitForTransaction({
        hash: data?.hash,
    })

    const onSubmit = async () => {
        try {
            const proof = verifyedData.data;
            const schemaId = "0x44a18728bda7ce4b5891c75a6e6d316f8d9020453bdf55754e63c1d3a85acee9";
            const expirationDate = '0'
            let {auth, signature} = proof
            signature = '0x' + signature
            const {acc_and_type_hash, request_id, account_plain} = auth
            const subject = request_id
            const attestationData = utils.defaultAbiCoder.encode([
                'string', 'string'
            ], ['google', account_plain])
            const hexSub = utils.hexlify(utils.toUtf8Bytes(subject))

            const attestationPayload = utils.defaultAbiCoder.encode(
                ["tuple(bytes32, uint64, bytes, bytes)"], [[
                    schemaId, expirationDate, hexSub, attestationData
                ]]
            )
            const sig = utils.defaultAbiCoder.encode(
                ["bytes[]"], [[signature]]
            )
            const contract = new Contract(ContractAddress, abiContract).connect(singer!)
            const tx = await contract.attest({
                schemaId,
                expirationDate,
                attestationData,
                subject: hexSub
            }, [signature])
            await tx.wait()
            alert("Success")
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div className='flex flex-col-reverse lg:flex-col justify-between h-full'>
            <div
                className='lg:pb-10 flex lg:flex-col py-2 flex-row-reverse lg:justify-center justify-between items-center  lg:items-end lg:-mt-10'>
                <div className='lg:mb-10'>
                    <Logout/>
                </div>
                <div
                    className={`py-0.5 px-1  w-16 flex-initial bg-[#1f1f1f] inline-flex justify-between   rounded-full  `}>
                    <button className={`mr-2 w-6 h-6 rounded-full px-1`} onClick={onClick}>
                        {
                            !showAll ?
                                <MdHistory color={'#9352FF'} className={`${!showAll ? 'visible' : 'hidden'}`}
                                           size={18}/>
                                : <div className='w-5 h-5 bg-white rounded-full'>
                                </div>
                        }
                    </button>
                    <button className={` rounded-full pr-1`} onClick={onClick}>
                        {
                            showAll ?
                                <FaUserAlt color={'#9352FF'} size={16}/> :
                                <div className='w-5 h-5   bg-white rounded-full'>
                                </div>
                        }

                    </button>
                </div>

            </div>
            <div className='lg:p-20 lg:h-full  bg-[#1f1f1f]  rounded-lg p-4  overflow-scroll'>
                {
                    verifyedData ? <JsonItem item={verifyedData}/> : <span
                        className={`${firaCode.className} text-sm`}>{'// Verify your accounts to see DAuth in actions'}</span>
                }
                {
                    verifyedData && <>
                        {
                            isConnected ?
                                <button className={`mr-2 w-32 h-12 rounded-full  bg-[#592b71]`} onClick={onSubmit}>
                                    Submit
                                </button>
                                : <ConnectButton/>
                        }
                    </>
                }
            </div>


        </div>
    )
}

export default SignatureData