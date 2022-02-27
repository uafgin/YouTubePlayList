import React from 'react'
import { fontSizes } from '@ds.e/foundations';

export interface TextProps {
    size?: keyof typeof fontSizes
}

const Text: React.FC<TextProps> = ({ size = fontSizes.base, children }) => {
    const className = `dse-text dse-text-${size}`

    return <p className={className}>{children}</p>
}

export default Text