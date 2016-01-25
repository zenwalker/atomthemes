import React, { PropTypes } from 'react';
import '../styles/theme.css';

const Theme = (props) => {
  const { data } = props;

  const creenshotStyle = {
    backgroundImage: `url(${data.screenshot})`,
  };

  return (
    <a className="theme" href={data.atom_url} target="_blank" title={data.name}>
      <div className="theme_info">
        <h2 className="theme_name">{data.name}</h2>
      </div>
      <div className="theme_screenshot" style={creenshotStyle}/>
    </a>
  );
};

Theme.propTypes = {
  data: PropTypes.object,
};

export default Theme;
