import React from './node_modules/react';
import ItemSummary from './ListItem';
import { Link } from './node_modules/react-router-dom';

const ProjectList = ({ items, path }) => {
  return (
    <div className="project-list section">
      {items &&
        items.map(item => {
          return (
            <Link to={`/${path}/${item.id}`} key={item.id}>
              <ItemSummary project={item} />
            </Link>
          );
        })}
    </div>
  );
};

export default ProjectList;
