import React from 'react';
import { Container as ContainerType } from '../types/Container';

interface ContainerListProps {
  containers: ContainerType[];
}

const ContainerList: React.FC<ContainerListProps> = ({ containers }) => {
  return (
    <div className="mt-4 d-flex flex-wrap justify-content-center">
      {containers.length === 0 ? (
        <div className="text-center">No containers found.</div>
      ) : (
        containers.map(container => (
          <div className="card m-2" style={{ width: '18rem' }} key={container.id}>
            <div className="card-body">
              <h5 className="card-title">{container.name}</h5>
              <p className="card-text">IP: {container.ip}</p>
              <p className="card-text">
                Status: <span className={`badge ${container.status === 'running' ? 'bg-success' : 'bg-danger'}`}>{container.status}</span>
              </p>
            </div>
          </div>
        ))
      )}
      <button className="btn btn-primary mt-3">Refresh</button>
    </div>
  );
};

export default ContainerList;