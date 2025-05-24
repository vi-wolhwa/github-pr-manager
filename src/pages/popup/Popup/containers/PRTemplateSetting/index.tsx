import serviceListStorage, { Service } from '@root/src/shared/storages/serviceListStorage';
import PRTemplateSetting from '../../components/PRTemplateSetting';
import useStorage from '@root/src/shared/hooks/useStorage';

/**
 * PR 템플릿 설정 컨테이너
 */
const PRTemplateSettingContainer = () => {
  const serviceList = useStorage(serviceListStorage);

  const addService = (service: Service) => {
    if (serviceList.some(item => item.name === service.name)) {
      alert('이미 존재하는 서비스입니다.');

      return;
    }
    serviceListStorage.set([...serviceList, service]);
  };

  return (
    <PRTemplateSetting.Wrapper>
      <PRTemplateSetting.TemplateInput addService={addService} />
      <PRTemplateSetting.ServiceList serviceList={serviceList} />
    </PRTemplateSetting.Wrapper>
  );
};

export default PRTemplateSettingContainer;
