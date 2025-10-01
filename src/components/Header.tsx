import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      {showBackButton && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
