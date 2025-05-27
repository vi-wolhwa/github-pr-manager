import SELECTOR from '../../constants/selector';
import updateDomElement from '../../../shared/utils/updateDomElement';
import COMPONENT_ID from '../../constants/componentId';

/**
 * Editor > Navbar > Split 탭 버튼 클릭 이벤트 핸들러
 * 1. Split 버튼을 클릭하면, Write 버튼을 클릭한다.
 * 2. Write 버튼의 하이라이팅을 제거하고, Split 버튼에 적용한다.
 * 3. 커스텀 Preview 컴포넌트의 hidden 속성을 제거한다.
 */
const onClickSplitTabButton = () => {
  console.log('split tab button click');

  /* 1 */
  const viewTypeWriteTabButton = document.querySelector(
    SELECTOR.COMPARE.editorNavbarViewTypeWriteTab,
  ) as HTMLButtonElement;

  viewTypeWriteTabButton.click();

  /* 2 */
  updateDomElement({
    action: 'addAttribute',
    targetSelector: SELECTOR.COMPARE.editorNavbarViewTypeWriteTab,
    attributes: [{ attr: 'aria-selected', value: 'false' }],
  });

  updateDomElement({
    action: 'addAttribute',
    targetSelector: `#${COMPONENT_ID.EditorNavbarSplitTabButton}`,
    attributes: [{ attr: 'aria-selected', value: 'true' }],
  });

  /* 3 */
  updateDomElement({
    action: 'removeAttribute',
    targetSelector: `#${COMPONENT_ID.EditorContentCustomPreview}`,
    attributes: [{ attr: 'hidden' }],
  });
};

export default onClickSplitTabButton;
