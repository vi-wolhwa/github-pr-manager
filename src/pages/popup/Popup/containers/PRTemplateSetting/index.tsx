import PRTemplateSetting from '../../components/PRTemplateSetting';
import { Service } from '../../components/PRTemplateSetting/types';

const serviceList: Service[] = [
  {
    name: 'content',
    displayName: '콘텐츠',
  },
  {
    name: 'test',
    displayName: '테스트',
  },
];

const PRTemplateSettingContainer = () => {
  return (
    <PRTemplateSetting.Wrapper>
      <PRTemplateSetting.TemplateInput />
      <PRTemplateSetting.ServiceList serviceList={serviceList} />
    </PRTemplateSetting.Wrapper>
  );
};

export default PRTemplateSettingContainer;
