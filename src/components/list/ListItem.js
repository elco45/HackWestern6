import React from './node_modules/react';
import moment from './node_modules/moment';

const ProjectSummary = ({ item }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{item.title}</span>
        <p>
          Posted by {item.authorFirstName} {item.authorLastName}
        </p>
        <p className="grey-text">
          {moment(item.createdAt.toDate()).calendar()}
        </p>
      </div>
    </div>
  );
};

export default ProjectSummary;
