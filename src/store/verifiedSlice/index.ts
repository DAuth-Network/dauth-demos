import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface CounterState {
    activedItem: string,
    verifyedData: any
}

const initialState: CounterState = {
    activedItem: 'email',
    verifyedData: null
}


export const verifiedDataSlice = createSlice({
    name: 'verifiedData',
    initialState,
    reducers: {
        updateActivedItem: (state, action: PayloadAction<string>) => {
            state.activedItem = action.payload
        },
        updateVerifyedData: (state, action: PayloadAction<string>) => {
            state.verifyedData = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {updateActivedItem, updateVerifyedData } = verifiedDataSlice.actions

export default verifiedDataSlice.reducer