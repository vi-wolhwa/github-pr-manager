type Props = {
  templateNames: string[];
  onSelect: (name: string) => void;
};

/**
 * PR 템플릿 선택 셀렉트 컴포넌트
 */
const TemplateSelector = ({ templateNames, onSelect }: Props) => {
  return (
    <div className="mb-3">
      <h3 className="f4 mb-2" id="pr_template_selector_header">
        Choose a Pull Request template
      </h3>
      <select
        className="form-select required js-quick-submit FormControl FormControl-large"
        aria-labelledby="pr_template_selector_header"
        onMouseDown={e => e.stopPropagation()}
        onChange={e => onSelect(e.target.value)}
        style={{ width: '100%' }}>
        <option value="">Choose a Pull Request template</option>
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
