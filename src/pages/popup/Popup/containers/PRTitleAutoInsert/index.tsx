import serviceListStorage, { Service } from '@root/src/shared/storages/serviceListStorage';
import PRTemplateSetting from '../../components/PRTemplateSetting';
import useStorage from '@root/src/shared/hooks/useStorage';

/**
 * PR 템플릿 설정 컨테이너
 */
const PRTitleAutoInsertContainer = () => {
  const serviceList = useStorage(serviceListStorage);

  const addService = (service: Service) => {
    if (serviceList.some(item => item.name === service.name)) {
      alert('이미 존재하는 서비스입니다.');

      return;
    }
    serviceListStorage.set([...serviceList, service]);
  };

  const removeService = (name: string) => {
    const newServiceList = serviceList.filter(item => item.name !== name);
    serviceListStorage.set(newServiceList);
  };

  return (
    <PRTemplateSetting.Wrapper>
      <PRTemplateSetting.TemplateInput addService={addService} />
      <PRTemplateSetting.ServiceList serviceList={serviceList} removeService={removeService} />
    </PRTemplateSetting.Wrapper>
  );
};

export default PRTitleAutoInsertContainer;
