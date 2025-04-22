import React from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  Spacer, 
  IconButton, 
  useColorMode, 
  useColorModeValue 
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '../icons';
import { GradientBox } from '../ui';

export const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgGradient = useColorModeValue(
    'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #434343 0%, #000000 100%)'
  );

  return (
    <GradientBox
      gradientType="header"
      p={4}
      borderRadius="xl"
      boxShadow="md"
      mb={6}
    >
      <Flex align="center">
        <Heading size="lg" color="white">タスク管理アプリ</Heading>
        <Spacer />
        <IconButton
          aria-label={colorMode === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          color="white"
          _hover={{ bg: 'whiteAlpha.200' }}
        />
      </Flex>
    </GradientBox>
  );
};
