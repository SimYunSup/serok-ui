import React from 'react';
import { Switch } from '@/lib/ui/Switch';
import { AlertDialog, DialogTrigger } from '@/lib/ui/Dialog';
import { Button } from '@/lib/ui/Button';

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

export function DialogExample() {
  return (
    <DialogTrigger>
      <Button variant="primary">로그인 필요</Button>
      <AlertDialog
        variant="confirmation"
        title="게시글을 작성하려면 로그인이 필요해요."
        primaryActionLabel="확인"
        cancelLabel="취소"
      >
        로그인 후 분실물 주인을 찾아주세요!
      </AlertDialog>
    </DialogTrigger>
  );
}
