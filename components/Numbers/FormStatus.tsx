import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { COLORS } from '@/styles/constants';

interface StatusProps {
  submitted: boolean;
  status: {
    success: boolean;
    message: string;
  };
}

interface StyleProps {
  success: boolean;
}

const FormStatus: React.FC<StatusProps> = ({ status, submitted }) => {
  const [statusVisible, setStatusVisible] = useState(false);

  useEffect(() => {
    if (submitted && status.message != '') {
      setStatusVisible(true);

      setTimeout(() => {
        setStatusVisible(false);
      }, 5000);
    }
  }, [submitted]);

  return (
    <Wrapper>
      {statusVisible && (
        <AlertCard success={status.success}>{status.message}</AlertCard>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10px;
`;

const AlertCard = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 50px;
  color: ${(p) => (p.success ? COLORS.success900 : COLORS.error900)};
  background-color: ${(p) => (p.success ? COLORS.success100 : COLORS.error100)};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export default FormStatus;
