import React from 'react'
import PageHeader from '../component/PageHeader'

export default ({children, wrapperClassName, ...restProps}) => (
    <div style={{margin: '-24px -24px 0'}} className={wrapperClassName}>
        <PageHeader key="pageheader" {...restProps}/>
        {children ? <div className="page-header-layout">{children}</div> : null}
    </div>
)