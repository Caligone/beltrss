import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'gatsby';
import { max } from 'underscore';

import Layout from '../components/layout';

import { addFeed, feedsSelector } from '../store/reduxModules/Feeds';

class FeedsPage extends Component {

    constructor(props) {
        super(props);
        this.addFeed = this.addFeed.bind(this);
        this.onPendingRssUrlChange = this.onPendingRssUrlChange.bind(this);
        this.state = {
            pendingRSSUrl: '',
        };
    }

    onPendingRssUrlChange(e) {
        const { value } = e.target;
        this.setState({
            pendingRSSUrl: value,
        });
    }

    addFeed(e) {
        e.preventDefault();
        const { FeedsActions, feeds } = this.props;
        const { pendingRSSUrl } = this.state;
        FeedsActions.addFeed({
            id: (max(feeds, 'id').id || 0) + 1 ,
            url: pendingRSSUrl,
            title: pendingRSSUrl,
        });
    }

    renderFeedsList() {
        const { feeds } = this.props;
        return feeds.map(feed => (
            <li key={feed.id}>
                {feed.title}
            </li>
        ));
    }

    renderAddRSSForm() {
        const { pendingRSSUrl } = this.state;
        return (
            <form onSubmit={this.addFeed}>
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="https://..."
                            value={pendingRSSUrl}
                            onChange={this.onPendingRssUrlChange}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input type="submit" className="button" value="Add" />
                    </div>
                </div>
            </form>
        );
    }

    render() {
        return (
            <Layout>
                <Link to="/">
                    Back
                </Link>
                <ul>
                    {this.renderFeedsList()}
                </ul>
                {this.renderAddRSSForm()}
            </Layout>
        );
    }
}

export function mapStateToProps(state) {
    return {
        feeds: feedsSelector(state),
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        FeedsActions: bindActionCreators({
            addFeed,
        }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FeedsPage);
