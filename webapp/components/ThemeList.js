import React, { Component } from 'react';
import { throttle } from 'lodash';
import '../styles/theme-list.css';
import SearchForm from './SearchForm';
import request from 'superagent';
import Theme from './Theme';

class ThemeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        query: '',
        type: 'ui',
      },
      inProgress: true,
      themes: [],
      page: 1,
    };

    this.throttledFormUpdate = throttle(this.handleFormUpdate, 500);
    this.throttledScroll = throttle(this.handleScroll, 500);
  }

  componentDidMount() {
    this.fetchData(this.state.formData);
    this._handleScroll = this.throttledScroll.bind(this);
    window.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll);
  }

  handleScroll() {
    const scrolledY = window.pageYOffset || document.documentElement.scrollTop;
    const body = document.body, html = document.documentElement;

    const scrollHeight = Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    ) - window.outerHeight - 200;

    if (!this.state.inProgress && scrolledY >= scrollHeight) {
      let { formData, page } = this.state;
      page++;

      this.fetchData(formData, { page });
      this.setState({ page });
    }
  }

  handleFormUpdate(formData) {
    this.setState({ formData, page: 1, themes: [] }, () => {
      this.fetchData(formData);
    });
  }

  fetchData(formData, query={}) {
    let themes = this.state.themes;
    this.setState({ inProgress: true });

    request
      .get('/api/themes')
      .query(formData)
      .query(query)
      .end((err, res) => {
        themes = themes.concat(res.body);
        this.setState({ themes, inProgress: false });
      })
    ;
  }

  render() {
    const { themes, inProgress } = this.state;

    const noResults = !(themes.length || inProgress)
      ? <div>Nothing found</div>
      : null
    ;

    return (
      <div className="theme-list">
        <h1 className="theme-list_heading">Atom Themes</h1>
        <div className="theme-list_search">
          <SearchForm onChange={this.throttledFormUpdate.bind(this)} />
        </div>
        <div className="package-list_packages">
          {themes.map(function(theme, i) {
            return <Theme key={i} data={theme} />;
          })}
        </div>
        {noResults}
      </div>
    );
  }
}

export default ThemeList;
