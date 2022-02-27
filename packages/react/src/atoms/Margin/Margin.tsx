import React from 'react';
import { spacing } from '@ds.e/foundations';

interface SpacingProps {
    space?: keyof typeof spacing
    left?: boolean,
    right?: boolean,
    top?: boolean,
    bottom?: boolean,
    cssClass?: string
}

const Margin: React.FC<SpacingProps> = ({ space = 'xxxs', children, left, right, top, bottom, cssClass }) => {
    let className = `${cssClass}`

    if (! left && ! right && ! top && ! bottom) {
        className = `${className} dse-margin-${space}`
    }

    if (left) {
        className = `${className} dse-margin-left-${space}`
    }

    if (right) {
        className = `${className} dse-margin-right-${space}`
    }

    if (top) {
        className = `${className} dse-margin-top-${space}`
    }

    if (bottom) {
        className = `${className} dse-margin-bottom-${space}`
    }

    return <div className={className}>
        {children}
    </div>
}

export default Margin;