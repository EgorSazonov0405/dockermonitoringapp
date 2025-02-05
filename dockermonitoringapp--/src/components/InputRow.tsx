import React, { useState } from 'react';

interface InputRowProps {
    onAdd: (entry: Entry) => void;
}

export interface Entry {
    name: string;
    ipAddress: string;
    pingTime: string;
    status: string;
}

const InputRow: React.FC<InputRowProps> = ({ onAdd }) => {
    const [name, setName] = useState<string>('');
    const [ipAddress, setIpAddress] = useState<string>('');
    const [pingTime, setPingTime] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAdd({ name, ipAddress, pingTime, status });
        setName('');
        setIpAddress('');
        setPingTime('');
        setStatus('');
    };

    return (
        <form onSubmit={handleSubmit} className="input-row">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="IP-address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Ping Time"
                value={pingTime}
                onChange={(e) => setPingTime(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            />
            <button type="submit">Ping Container</button>
        </form>
    );
};

export default InputRow;