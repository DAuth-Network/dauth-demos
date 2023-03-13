import React from 'react'


const list = [
    {
        item: "email",
        verified: false,
        value: '8743b52063cd84097a65d1633f5c74f5'
    }
]
const itemList = ['email', 'twitter', 'github', 'discord', 'google']
const VerifiedList = () => {
    return (
        <div>
            {
                itemList.map((item, index) => {
                    return <div key={item} className={'w-3/5 border-[1.5px solid #383838;]'}>
                        <div>

                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default VerifiedList