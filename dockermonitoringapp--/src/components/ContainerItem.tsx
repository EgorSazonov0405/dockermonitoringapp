import React from 'react';
import { Container } from '../types/Container';

interface ContainerItemProps {
  container: Container;
}

const ContainerItem: React.FC<ContainerItemProps> = ({ container }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{container.name}</h5>
        <p className="card-text">IP: {container.ip}</p>
        <p className="card-text">Status: <span className={`badge ${container.status === 'running' ? 'bg-success' : 'bg-danger'}`}>{container.status}</span></p>
      </div>
    </div>
  );
};

export default ContainerItem;