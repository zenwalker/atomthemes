import React, { PropTypes } from 'react';
import '../styles/theme.css';

const Theme = (props) => {
  const { data } = props;

  const creenshotStyle = {
    backgroundImage: `url(${data.screenshot})`,
  };

  return (
    <div className="theme">
      <h2 className="theme_name">
        <a href={data.atom_url} target="_blank">{data.name}</a>
      </h2>
      <div className="theme_screenshot" style={creenshotStyle}/>
    </div>
  );
};

Theme.propTypes = {
  data: PropTypes.object,
};

export default Theme;
