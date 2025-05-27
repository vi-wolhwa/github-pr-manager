import updateDomElement from '../../../shared/utils/updateDomElement';
import COMPONENT_ID from '../../constants/componentId';

/**
 * Editor > Navbar > Preview 탭 버튼 클릭 이벤트 핸들러
 * 1. Split 버튼에 하이라이팅을 제거한다.
 * 2. 커스텀 Preview 컴포넌트에 hidden 속성을 추가한다.
 */
const onClickPreviewTabButton = () => {
  console.log('preview tab button click');

  /* 1 */
  updateDomElement({
    action: 'addAttribute',
    targetSelector: `#${COMPONENT_ID.EditorNavbarSplitTabButton}`,
    attributes: [{ attr: 'aria-selected', value: 'false' }],
  });

  /* 2 */
  updateDomElement({
    action: 'addAttribute',
    targetSelector: `#${COMPONENT_ID.EditorContentCustomPreview}`,
    attributes: [{ attr: 'hidden', value: 'true' }],
  });
};

export default onClickPreviewTabButton;
