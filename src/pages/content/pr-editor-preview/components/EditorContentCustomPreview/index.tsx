import COMPONENT_ID from '../../constants/componentId';

/**
 * Editor > Content > 커스텀 Preview
 */
const EditorContentCustomPreview = () => {
  return (
    <div
      id={COMPONENT_ID.EditorContentCustomPreview}
      hidden
      style={{ width: '200px', height: '200px', background: 'red' }}>
      커스텀 Preview 컴포넌트
    </div>
  );
};

export default EditorContentCustomPreview;
