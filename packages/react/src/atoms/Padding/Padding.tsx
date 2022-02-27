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

const Padding: React.FC<SpacingProps> = ({ space = 'xxxs', children, left, right, top, bottom, cssClass = '' }) => {
    let className = `${cssClass}`;

    if (! left && ! right && ! top && ! bottom) {
        className = `${className} dse-padding-${space}`
    }

    if (left) {
        className = `${className} dse-padding-left-${space}`
    }

    if (right) {
        className = `${className} dse-padding-right-${space}`
    }

    if (top) {
        className = `${className} dse-padding-top-${space}`
    }

    if (bottom) {
        className = `${className} dse-padding-bottom-${space}`
    }

    return <div className={className}>
        {children}
    </div>
}

export default Padding;