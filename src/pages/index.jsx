import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'gatsby';
import DateFns from 'date-fns';
import locale from 'date-fns/locale/en';

import Layout from '../components/layout';

import { articlesSelector } from '../store/reduxModules/Articles';
import { refreshFeeds } from '../store/reduxModules/Feeds';

class IndexPage extends Component {

    constructor(props) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh() {
        const { FeedsActions } = this.props;
        FeedsActions.refreshFeeds();
    }

    renderArticle(article) {
        return (
            <div className="card" key={article.id}>
                <Link className="card-content" to="/article" state={{article}} style={{ display: 'inline-block '}}>
                    <p className="title is-size-6">
                        <i className={`fa${article.read ? 'r' : 's'} fa-circle`} style={{ paddingRight: '0.5rem' }}/>
                        {article.title}
                    </p>
                    <p className="subtitle is-size-6">
                        {DateFns.distanceInWordsToNow(article.isoDate, { locale })} ago
                    </p>
                </Link>
            </div>
        );
    }

    renderArticles() {
        const { articles } = this.props;
        if (articles.length <= 0) return null;
        return (
            <section className="container">
                {articles.map(this.renderArticle)}
            </section>
        );
    }
  
    render() {
        return (
            <Layout>
                <ul>
                    <li>
                        <a onClick={this.onRefresh}>
                            Reload
                        </a>
                    </li>
                    <li>
                        <Link to="/feeds">
                            Feeds
                        </Link>
                    </li>
                </ul>
                {this.renderArticles()}
            </Layout>
        );
    }
}

export function mapStateToProps(state) {
    return {
        articles: articlesSelector(state),
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        FeedsActions: bindActionCreators({
            refreshFeeds,
        }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IndexPage);
