import React from 'react';
import { Container as ContainerType } from '../types/Container';

interface ContainerListProps {
  containers: ContainerType[];
}

const ContainerList: React.FC<ContainerListProps> = ({ containers }) => {
  return (
    <>
    <div className="containers">
      {containers.length === 0 ? (
        <div className="text-center">No containers found.</div>
      ) : (
        containers.map(container => (
          <div className="card m-2" style={{ width: '18rem' }} key={container.id}>
            <div className="card-body">
              <h5 className="card-title">Server: {container.name}</h5>
              <p className="card-text">IP: {container.ip}</p>
              <p className="card-text">
                Status: <span className={`badge ${container.status === 'running' ? 'bg-success' : 'bg-danger'}`}>{container.status}</span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default ContainerList;