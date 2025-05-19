import { useEffect, useState } from 'react';

const EditorNavbarSplitTabButton = () => {
  const [isSelected, setIsSelected] = useState(false);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <button
      type="button"
      className="btn-link tabnav-tab preview-tab js-preview-tab"
      role="tab"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={onClick}>
      Split
    </button>
  );
};

export default EditorNavbarSplitTabButton;
