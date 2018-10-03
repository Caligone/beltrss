import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, navigate } from 'gatsby';
import DateFns from 'date-fns';
import locale from 'date-fns/locale/en';

import { markArticleAsRead } from '../store/reduxModules/Articles';

import Layout from '../components/layout';

export const MARK_AS_READ_DELAY = 2;

class Article extends Component {

    componentDidMount() {
        try {
            /* eslint-disable-next-line no-unused-expressions */
            this.props.location.state.article.title;
        } catch(e) {
            navigate('/');
        }
        this.timer = setTimeout(this.markAsRead.bind(this), 1000 * MARK_AS_READ_DELAY);
    }

    componentWillUnmount() {
        if (!this.timer) return;
        clearTimeout(this.timer);
    }

    markAsRead() {
        const { ArticlesActions, location } = this.props;
        const { article } = location.state;
        ArticlesActions.markArticleAsRead(article.id);
    }

    render () {
        if (!this.props.location.state) {
            return null;
        }
        const { article } = this.props.location.state;
        return (
            <Layout>
                <Link to="/">
                    Back
                </Link>
                <h3 className="title is-size-5">{article.title}</h3>
                <div className="subtitle is-size-5">
                    {DateFns.distanceInWordsToNow(article.isoDate, { locale })}
                </div>
                <div className="content" dangerouslySetInnerHTML={{ __html: article.content }} />
            </Layout>
        );
    }
};


export function mapStateToProps(state) {
    return {};
}

export function mapDispatchToProps(dispatch) {
    return {
        ArticlesActions: bindActionCreators({
            markArticleAsRead,
        }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Article);

