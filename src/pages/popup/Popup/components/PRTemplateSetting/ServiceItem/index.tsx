import { Service } from '../types';

type Props = {
  service: Service;
};

const ServiceItem = ({ service: { name, displayName } }: Props) => {
  return (
    <li>
      <span>{name}</span>
      <span>{'->'}</span>
      <span>{displayName}</span>
    </li>
  );
};

export default ServiceItem;
