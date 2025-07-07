import React from 'react';

interface MultiDeleteBarProps {
  selectedCount: number;
  onDelete: () => void;
}

const MultiDeleteBar: React.FC<MultiDeleteBarProps> = ({ selectedCount, onDelete }) => {
  if (selectedCount === 0) return null;
  return (
    <div style={{ padding: '1rem', background: '#ffeaea', borderRadius: 4, marginBottom: 16 }}>
      <span>{selectedCount} selected</span>
      <button style={{ marginLeft: 16 }} onClick={onDelete}>Delete Selected</button>
    </div>
  );
};

export default MultiDeleteBar; 