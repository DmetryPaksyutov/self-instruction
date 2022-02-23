import React from 'react'
import {progressItem} from '../../../packets/api/TypeRequest'

import st from './ProgressItems.module.scss'


interface IProps {
    progress : progressItem[],
}

export const ProgressItems : React.FC<IProps> = ( {progress} ) => {
    let listItems
        if (progress && progress.length) listItems = progress.map((item, index) => {
        let stItem
        switch (item) {
            case "yes": stItem = st.progressItems__item_yes
                break
            case "no": stItem = st.progressItems__item_no
                break
            case "err": stItem = st.progressItems__item_err
                break
        }
        return <div
        key={index}
        className={`${st.progressItems__item} ${(stItem)}`} ></div>
    })

    return <div className={st.progressItems}>
        {listItems}
    </div>
}