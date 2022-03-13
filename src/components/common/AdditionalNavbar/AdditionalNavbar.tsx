import React from 'react'

import st from './AdditionalNavbar.module.scss'


interface IProps {
    activeItem : number,
    setActiveItem: (itemIndex : number) => () => void,
    listItems : string[]
}

export const AdditionalNavbar : React.FC<IProps> = ({activeItem,
                                                        setActiveItem,
                                                        listItems}) => {
        const list = listItems.map( (text, index) => {
        return <div key={index}>
        <button className={(index === activeItem) ? st.additionalNavbar__item_active : st.additionalNavbar__item}
                onClick={setActiveItem(index)}
        >{text}</button>
    </div>})

    return <div className={st.additionalNavbar}>
        {list}
    </div>
}

