import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserSetsListAction } from '@/redux/user-sets/slice';
import SetItem from '@/components/user-sets/set-item/SetItem';
const MySetsList = () => {
    const mySets = useSelector((state: any) => state.UserSets.mySets);
    const dispatch = useDispatch();
    const getUserSetsList = () => {
        dispatch({
            type: getUserSetsListAction.type
        })
    }
    useEffect(() => {
        getUserSetsList();
    }, [])
    return (
        <div>
            {Array.isArray(mySets)
                &&
                mySets.map((set: any) => {
                    const dataSet = {
                        ...set,
                        totalCards: set.cards.length,
                    }
                    return (
                        <>
                            <SetItem data={dataSet} />
                        </>
                    )
                })
            }
        </div>
    )
}

export default MySetsList