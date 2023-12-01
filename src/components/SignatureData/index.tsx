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
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ISignatureData {
    data: any
}

const GOOGLE = utils.keccak256(utils.toUtf8Bytes("google"));
const GITHUB = utils.keccak256(utils.toUtf8Bytes("github"));

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
            const schemaId = "0x912214269b9b891a0d7451974030ba13207d3bf78e515351609de9dd8a339686";
            const expirationDate = '0'
            let {auth, signature} = proof

            signature = '0x' + signature
            const {acc_and_type_hash, request_id, account_plain} = auth
            const subject = '0x' + request_id
            const accountHash = utils.keccak256(utils.toUtf8Bytes(account_plain));
            
            /*
            const attestationData = utils.defaultAbiCoder.encode([
                'bytes32', 'bytes32'
            ], ['google', account_plain])
            */
           

            const attestationData = utils.defaultAbiCoder.encode(
                ["bytes32", "bytes32"],
                [GOOGLE, accountHash]
              );

            const attestationPayload = utils.defaultAbiCoder.encode(
                ["tuple(bytes32, uint64, bytes, bytes)"], [[
                    schemaId, expirationDate, subject, attestationData
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
                subject
            }, [signature])
            await tx.wait()
            toast.success('Attestation registered successfully!');
        } catch (e) {
            toast.error("Error: Parameter Error or Duplicate Registration.")
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
                        className={`${firaCode.className} text-sm`}>{'// Verify your accounts to see Openid3 in actions'}</span>
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
            <ToastContainer  position="bottom-right"
                             autoClose={3000}
                             hideProgressBar={false}
                             newestOnTop={false}
                             closeOnClick
                             rtl={false}
                             pauseOnFocusLoss
                             draggable
                             pauseOnHover
                             theme="light"/>

        </div>
    )
}

export default SignatureData