import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ParseCSV from '@/utils/ParseCSV';

import Card from '../UI/Card';
import Button from '../UI/Button';
import { COLORS } from '@/styles/constants';

const NumberUpload = () => {
  const [fileLabel, setFileLabel] = useState('');
  const [isValidFile, setIsValidFile] = useState(false);
  const [parsedUpload, setParsedUpload] = useState({});
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const textNode = document.querySelector('textarea');
    textNode!.value = JSON.stringify(parsedUpload, null, 2);
    setScrollHeight(textNode!.scrollHeight);
  }, [parsedUpload]);

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(e.target.files!)[0];

    if (!file) {
      setFileLabel('');
      setIsValidFile(false);
      return;
    }

    const { name, size, type } = file;

    if (type !== 'text/csv') {
      setFileLabel('Invalid file type');
      setIsValidFile(false);
      return;
    }

    const fileSize = (size / 1000).toFixed(2);
    setFileLabel(`${name} - ${fileSize}kb`);
    setIsValidFile(true);

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const csvData = reader.result;
        const formattedData = ParseCSV(csvData as string);
        setParsedUpload(formattedData);
      },
      false
    );

    reader.readAsText(file);
  };

  const dataChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = scrollHeight + 'px';
  };

  return (
    <Card>
      <Wrapper>
        <UploadWrapper>
          <FileInput
            type="file"
            id="file"
            accept=".csv"
            onChange={fileInputHandler}
          />
          <FileInputLabel htmlFor="file">Upload CSV</FileInputLabel>
          <FileName valid={isValidFile}>{fileLabel}</FileName>
          <TemplateLink
            href="/UploadTemplate.csv"
            download="UploadTemplate"
            show={isValidFile}
          >
            <Button>Download Template</Button>
          </TemplateLink>
        </UploadWrapper>
        <FormattedData
          id="formattedDataContainer"
          show={isValidFile}
          scrollHeight={scrollHeight}
          readOnly
        />
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
  flex-direction: column;
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
  padding: 0.5rem 1.5rem;
  border: 1px solid white;
  border-radius: 6px;
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

const FileName = styled.p<{ valid: boolean }>`
  color: ${(p) => (p.valid ? COLORS.primary : COLORS.error900)};
  font-size: 0.8rem;
  white-space: nowrap;
`;

const TemplateLink = styled.a<{ show: boolean }>`
  display: ${(p) => (p.show ? 'none' : 'block')};
`;

const FormattedData = styled.textarea<{ show: boolean; scrollHeight: number }>`
  display: ${(p) => (p.show ? 'block' : 'none')};
  width: 100%;
  min-height: 100px;
  height: ${(p) => p.scrollHeight}px;
  max-height: 70vh;
  resize: none;
  overflow: visible;
`;
