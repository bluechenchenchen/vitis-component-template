import React from 'react';
import styles from './index.scss'

interface Props {
    /**
     * 组件样式
     */
     style?: React.CSSProperties;
     /**
      * 显示的文本
      */
     text: React.ReactNode
}

export default React.forwardRef(function (props: Props, ref: React.ForwardedRef<HTMLDivElement>) {
    return <div className={styles.text} style={props.style} ref={ref}>{props.text}</div>
})
