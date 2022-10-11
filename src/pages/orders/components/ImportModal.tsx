import { Box, Button, Center, Group, Modal, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { getJobStatistic } from '@/api/job';
import { SelectionList } from '@/components/platform';
import { ACCEPT_IMPORT_EXCEL } from '@/constants';

import { importOrder } from '../query';

export const ImportModal: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const [platform, setPlatform] = useState('shopee');
  const [loading, setLoading] = useState(false);
  const [isJobRunning, setIsJobRunning] = useState(false);
  const { mutate } = useSWRConfig();
  const [refreshInterval, setRefreshInterval] = useState(0);
  const { data, isValidating } = useSWR(
    'job-statistic-order',
    () => getJobStatistic({ name: 'import_order_shopee' }),
    {
      refreshInterval: refreshInterval,
      onSuccess(data) {
        const isRunning = data.running > 0 || data.pending > 0;
        if (isRunning) {
          setRefreshInterval(1000);
        } else {
          setRefreshInterval(0);
        }
        setIsJobRunning(isRunning);
      },
    },
  );
  const [file, setFile] = useState<File>(null);

  const handleImportOrder = async (e: MouseEvent) => {
    try {
      e.stopPropagation();
      setLoading(true);
      const formData = new FormData();
      formData.append('order', file);
      const { data } = await importOrder(formData);
      if (data.id) {
        showNotification({
          color: 'green',
          message: 'Import thành công, xem kết quả tại danh sách đơn hàng!',
        });
        setOpened(false);
        setFile(null);
        mutate('job-statistic-order');
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
      <Button onClick={() => setOpened(true)} disabled={isValidating || isJobRunning}>
        {isJobRunning ? 'Đang xử lý...' : 'Tải lên dữ liệu'}
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Tải danh sách đơn hàng lên hệ thống"
        closeOnClickOutside={false}
      >
        <SelectionList onSelected={setPlatform} />
        <Box mt={'md'}>
          <Dropzone
            accept={ACCEPT_IMPORT_EXCEL}
            maxSize={10 * 1024 ** 2}
            loading={loading}
            onDrop={onDrop}
          >
            <Group
              position="center"
              spacing="sm"
              style={{ minHeight: 220, pointerEvents: 'none' }}
            >
              <Dropzone.Accept>
                <Text>{file?.name}</Text>
              </Dropzone.Accept>
              <Dropzone.Reject>File không hợp lệ</Dropzone.Reject>
              <Text size="xl">Kéo thả hoặc nhấn vào đây để tải file lên</Text>
              <Text size="sm" color="dimmed" mt={7}>
                Tối đa 10MB, định dạng xlsx,xls
              </Text>
            </Group>
          </Dropzone>
          {file && (
            <Center mt="sm">
              <Button loading={loading} onClick={(e) => handleImportOrder(e)}>
                Tải lên
              </Button>
            </Center>
          )}
        </Box>
      </Modal>
    </>
  );
};
