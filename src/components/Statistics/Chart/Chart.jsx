import React, {useEffect, useRef} from 'react'
import 'zingchart/es6'
import ZingChart from 'zingchart-react'
//import 'zingchart-react/dist/modules-es6/zingchart-depth.min.js'

export const Chart = ({ Config }) => {
    return <ZingChart data={Config}/>
}