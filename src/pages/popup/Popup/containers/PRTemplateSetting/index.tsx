import PRTemplateSetting from '../../components/PRTemplateSetting';
import { Service } from '../../components/PRTemplateSetting/types';

const serviceList: Service[] = [
  {
    name: 'content',
    displayName: '콘텐츠',
  },
];

const PRTemplateSettingContainer = () => {
  return (
    <PRTemplateSetting.Wrapper>
      {serviceList.map(service => (
        <PRTemplateSetting.ServiceItem key={service.name} service={service} />
      ))}
    </PRTemplateSetting.Wrapper>
  );
};

export default PRTemplateSettingContainer;
