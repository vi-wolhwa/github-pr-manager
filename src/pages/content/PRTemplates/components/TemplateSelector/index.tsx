import React from 'react';

type Props = {
  templateNames: string[];
  onSelect: (name: string) => void;
};

/**
 * PR 템플릿 선택 셀렉트 컴포넌트
 */
const TemplateSelector: React.FC<Props> = ({ templateNames, onSelect }) => {
  return (
    <div className="mb-3">
      <h3 className="f4 mb-2" id="pr_template_selector_header">
        Choose a template
      </h3>
      <select
        className="form-select required js-quick-submit FormControl FormControl-large"
        aria-labelledby="pr_template_selector_header"
        onChange={e => onSelect(e.target.value)}
        style={{ width: '100%' }}>
        <option value="">템플릿을 선택하세요</option>
        {templateNames.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelector;
