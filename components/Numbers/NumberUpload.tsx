import * as fs from 'fs';
import { parse } from 'csv-parse';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

import Card from '../UI/Card';
import Button from '../UI/Button';
import { COLORS } from '@/styles/constants';

const NumberUpload = () => {
  return (
    <Card>
      <Wrapper>
        <UploadWrapper>
          <FileInput type="file" id="file" accept=".csv" />
          <FileInputLabel htmlFor="file">Upload CSV</FileInputLabel>
          <FileName></FileName>
        </UploadWrapper>
        <FormattedData type="text-area" readOnly />
      </Wrapper>
    </Card>
  );
};

export default NumberUpload;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 40px;
`;

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const FileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

const FileInputLabel = styled.label`
  display: block;
  position: relative;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  background: ${COLORS.primary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${COLORS.secondary};
  }
`;

const FileName = styled.p`
  position: absolute;
  bottom: -25px;
  left: 20px;
  color: ${COLORS.primary};
`;

const FormattedData = styled.input`
  width: 100%;
  min-height: 100px;
`;
