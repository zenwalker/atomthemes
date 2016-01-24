import React, { Component } from 'react';
import '../styles/theme-list.css';
import SearchForm from './SearchForm';
import request from 'superagent';
import Spinner from './Spinner';
import Theme from './Theme';

class ThemeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: true,
      themes: [],
    };
  }

  componentDidMount() {
    this.fetchData({
      query: '',
      type: 'ui',
    });
  }

  fetchData(formData) {
    this.setState({ inProgress: true });
    request.get('/api/themes/' + formData.type, (err, res) => {
      this.setState({ themes: res.body, inProgress: false });
    });
  }

  render() {
    const { themes, inProgress } = this.state;
    let packagesContent = <Spinner />;

    if (!inProgress) {
      packagesContent = themes.map(function(theme, i) {
        return <Theme key={i} data={theme} />;
      });
    }

    return (
      <div className="theme-list">
        <div className="theme-list_search">
          <SearchForm onChange={this.fetchData.bind(this)} />
        </div>
        <div className="package-list_packages">
          {packagesContent}
        </div>
      </div>
    );
  }
}

export default ThemeList;
