import { useParams } from 'react-router-dom';

export const usePathId = () => (useParams() as { id: string }).id;
