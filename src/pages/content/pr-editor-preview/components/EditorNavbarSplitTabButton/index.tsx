import COMPONENT_ID from '../../constants/componentId';
import onClickSplitTabButton from '../../helpers/event/onClickSplitTabButton';

/**
 * Editor > Navbar > Split 탭 버튼
 */
const EditorNavbarSplitTabButton = () => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClickSplitTabButton();
  };

  return (
    <button
      id={COMPONENT_ID.EditorNavbarSplitTabButton}
      type="button"
      className="btn-link tabnav-tab preview-tab js-preview-tab"
      onClick={onClick}>
      Split
    </button>
  );
};

export default EditorNavbarSplitTabButton;
