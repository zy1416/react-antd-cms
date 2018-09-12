import React from 'react'
import {Link} from 'react-router-dom'
import {Breadcrumb} from 'antd'
import pathToRegexp from 'path-to-regexp'
import './index.css'
import withBreadcrumb from '../../context/withBreadcrumb'
import {urlToList} from '../../utils/utils'

class PageHeader extends React.Component {
    state = {
        breadcrumb: null
    }

    componentDidMount() {
        this.getBreadcrumbDom();
    }

    getBreadcrumbProps = () => {
        const {
            location: clocation,
            breadcrumbNameMap: cbreadcrumbNameMap
        } = this.props;

        return {
            routerLocation: clocation,
            breadcrumbNameMap: cbreadcrumbNameMap
        }
    }

    getBreadcrumb = (breadcrumbNameMap, url) => {
        let breadcrumb = breadcrumbNameMap[url]
        if (!breadcrumb) {
            Object.keys(breadcrumbNameMap).forEach((item) => {
                if (pathToRegexp(item).test(url)) {
                    breadcrumb = breadcrumbNameMap[item];
                }
            })
        }
        return breadcrumb || {}
    }

    getBreadcrumbDom = () => {
        const breadcrumb = this.conversionBreadcrumbList();
        this.setState({
            breadcrumb,
        });
    }

    conversionBreadcrumbList = () => {
        const {routerLocation, breadcrumbNameMap} = this.getBreadcrumbProps();
        const pathSnippets = urlToList(routerLocation.pathname);
        const extraBreadcrumbItems = pathSnippets.map((url, index) => {
            const currentBreadcrumb = this.getBreadcrumb(breadcrumbNameMap, url);
            return currentBreadcrumb && currentBreadcrumb.name ? (
                <Breadcrumb.Item key={url}>
                    {
                        index == pathSnippets.length - 1 ?
                            <Link to={url}>
                                {currentBreadcrumb.name}
                            </Link> :
                            <span>
                            {currentBreadcrumb.name}
                        </span>
                    }
                </Breadcrumb.Item>
            ) : null
        })

        extraBreadcrumbItems.unshift(
            <Breadcrumb.Item key="home">
                <Link to='/'>首页</Link>
            </Breadcrumb.Item>
        );

        return (
            <Breadcrumb className="page-header-breadcrumd">
                {extraBreadcrumbItems}
            </Breadcrumb>
        )
    }

    render() {
        const {title, content, routes} = this.props;
        const {breadcrumb} = this.state;
        return (
            <div className="page-header-container">
                {breadcrumb}
                <div className="page-header-detail">
                    <div className="page-header-row">
                        {title && <h1 className="page-header-title">{title}</h1>}
                    </div>
                    <div className="page-header-row">
                        {content && <div className="page-header-content">{content}</div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default withBreadcrumb(PageHeader)