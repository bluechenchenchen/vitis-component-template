import React from 'react';
import styles from './index.scss'

interface Props {
    /**
     * 组件尺寸
     */
    size: 'small' | 'middle' | 'large'
}

export default function (props: Props) {
    return <div className={styles.text}>在这里定义组件</div>
}
