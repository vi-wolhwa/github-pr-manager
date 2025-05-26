import updateDom from '../../shared/utils/updateDom';
import EditorNavbarSplitTabButton from '../components/EditorNavbarSplitTabButton/index';
import SELECTOR from '../constants/selector';

/*
 * Editor > Navbar > View 탭에 'split' 버튼을 렌더링하는 함수
 */
const renderSplitTabButton = () => {
  updateDom({
    action: 'append',
    targetSelector: SELECTOR.COMPARE.editorNavbarViewTypeTabs,
    component: <EditorNavbarSplitTabButton />,
  });
};

export default renderSplitTabButton;
