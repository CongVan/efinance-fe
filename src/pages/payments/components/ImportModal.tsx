import { Box, Button, Center, Group, Modal, Text } from '@mantine/core';
import { Dropzone, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import React, { useRef, useState } from 'react';
import { Stack } from 'tabler-icons-react';

import { SelectionList } from '@/components/platform';

import { importPayment } from '../query';

export const ImportModal: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const [platform, setPlatform] = useState('shopee');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>(null);

  const handleImport = async (e: MouseEvent) => {
    try {
      e.stopPropagation();
      setLoading(true);
      const formData = new FormData();
      formData.append('payment', file);
      const { data } = await importPayment(formData);
      if (data.id) {
        showNotification({
          color: 'green',
          message: 'Tải lên thành công, xem kết quả tại danh sách thanh toán!',
        });
        setOpened(false);
        setFile(null);
      }
    } catch (error) {
      showNotification({ color: 'red', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const onDrop = async (files: File[]) => {
    // file.current = files[0];
    setFile(files[0]);
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>Tải lên dữ liệu</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Tải danh sách thanh toán lên hệ thống"
        closeOnClickOutside={false}
      >
        <SelectionList onSelected={setPlatform} />
        <Box mt={'md'}>
          <Dropzone
            accept={MS_EXCEL_MIME_TYPE}
            maxSize={10 * 1024 ** 2}
            loading={loading}
            onDrop={onDrop}
          >
            {(status) => (
              <>
                <Group
                  position="center"
                  spacing="xl"
                  style={{ minHeight: 220, pointerEvents: 'none' }}
                >
                  {file ? (
                    <>
                      <Text>{file.name}</Text>
                    </>
                  ) : status.rejected ? (
                    <>File không hợp lệ</>
                  ) : (
                    <div>
                      <Text size="xl" inline>
                        Kéo thả hoặc nhấn vào đây để tải file lên
                      </Text>
                      <Text size="sm" color="dimmed" inline mt={7}>
                        Tối đa 10MB, định dạng xlsx,xls
                      </Text>
                    </div>
                  )}
                </Group>
              </>
            )}
          </Dropzone>
          {file && (
            <Center my="sm">
              <Button loading={loading} onClick={(e) => handleImport(e)}>
                Tải lên
              </Button>
            </Center>
          )}
        </Box>
      </Modal>
    </>
  );
};
