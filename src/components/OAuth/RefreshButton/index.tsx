import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { TbRefresh } from 'react-icons/tb'


interface IRefreshButton {
    onClick: () => void
    loading: boolean
}
const RefreshButton: FC<IRefreshButton> = ({ onClick, loading }) => {

    return (
        loading ? <motion.div
            className='w-6 h-6'
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <TbRefresh size={24} />
        </motion.div>
            : <TbRefresh size={24} onClick={onClick} />
    )
}

export default RefreshButton