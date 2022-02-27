import React from "react";
import { blocks } from '@ds.e/foundations';

interface FlexContainerProps {
    width?: keyof typeof blocks
    height?: keyof typeof blocks
    verticalCenter?: boolean;
}

const FlexContainer: React.FC<FlexContainerProps> = ({children, width = '10b', height='10b', verticalCenter=false}) => {
    return <div className={`dse-flex-container ${verticalCenter ? 'dse-flex-container_verticalalign' : ''} dse-dimention_height_${height} dse-dimention_width_${width}`}>
        {children}
    </div>
}

export default FlexContainer;