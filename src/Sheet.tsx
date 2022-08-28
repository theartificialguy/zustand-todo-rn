import { StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

interface SheetProps {
  children: React.ReactNode;
  sheetRef: React.RefObject<BottomSheet>;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const Sheet = ({ children, sheetRef, onClose, setInput }: SheetProps) => {
  const snapPoints = useMemo(() => ['70%'], []);
  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      onClose={() => {
        onClose(false);
        setInput('');
      }}
      snapPoints={snapPoints}
      enablePanDownToClose>
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  );
};

export default Sheet;

const styles = StyleSheet.create({});
