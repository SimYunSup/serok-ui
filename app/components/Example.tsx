import React from 'react';
import { Switch } from '@/lib/ui/Switch';
import { Button } from '@/lib/ui/Button';
import { ToastQueue } from '@/lib/ui/Toast/toast';

export function ControlledSwitchExample() {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <Switch
      variant="accent"
      isSelected={isSelected}
      onChange={setIsSelected}
    >
      {isSelected ? '(켜짐)' : '(꺼짐)'}
    </Switch>
  );
}

export function ToastExample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button
        variant="primary"
        onPress={() => ToastQueue.neutral('토스트 메시지 입력하기')}
      >
        Neutral
      </Button>
      <Button
        variant="primary"
        onPress={() => ToastQueue.info('토스트 메시지 입력하기')}
      >
        Info
      </Button>
      <Button
        variant="primary"
        onPress={() => ToastQueue.positive('토스트 메시지 입력하기')}
      >
        Positive
      </Button>
      <Button
        variant="negative"
        onPress={() => ToastQueue.negative('토스트 메시지 입력하기')}
      >
        Negative
      </Button>
      <Button
        variant="primary"
        onPress={() => ToastQueue.info('토스트 메시지 입력하기', {
          actionLabel: '버튼',
          onAction: () => console.log('Action clicked'),
        })}
      >
        With Action
      </Button>
      <Button
        variant="primary"
        onPress={() => ToastQueue.positive('토스트 메시지 입력하기토스트 메시지 입력하기 토스트', {
          actionLabel: '버튼',
          onAction: () => console.log('Action clicked'),
        })}
      >
        Long Text with Action
      </Button>
    </div>
  );
}
