import React from 'react';
import styled from 'styled-components';
import {View} from 'react-native';
import {Text as TextPaper, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Composer as ComposerGiftedChat,
  InputToolbar as InputToolbarGiftedChat,
  Bubble as BubbleGiftedChat,
  Send as SendGiftedChat,
} from 'react-native-gifted-chat';

export const ContainerHeader = styled(View)`
  padding: 15px 30px 15px 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextHeader = styled(TextPaper)`
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

export const ViewListUser = styled(View)`
  align-items: center;
  flex-direction: row;
`;

export const ViewContainerUser = styled(View)`
  margin-left: 8px;
`;

export const ImageUser = styled(Avatar.Image).attrs({size: 38})``;

export const BadgeUser = styled(Avatar.Text).attrs({size: 12})`
  background-color: ${(props) => props.theme.colors.success};
  position: absolute;
  right: 0;
`;

export const Composer = styled(ComposerGiftedChat).attrs((props) => ({
  textInputStyle: {
    color: props.theme.colors.text,
    lineHeight: 20,
    paddingRight: 10,
  },
}))``;

export const InputToolbar = styled(InputToolbarGiftedChat).attrs((props) => ({
  primaryStyle: {
    backgroundColor: props.theme.colors.tabBackground,
    borderRadius: 30,
    paddingHorizontal: 12,
    alignItems: 'center',
    paddingVertical: 0,
  },
  containerStyle: {
    paddingVertical: 23,
    backgroundColor: props.theme.colors.background,
    paddingHorizontal: 35,
    borderTopColor: 'transparent',
  },
}))``;

export const Bubble = styled(BubbleGiftedChat).attrs((props) => ({
  wrapperStyle: {right: {backgroundColor: props.theme.colors.button}},
}))``;

const IconSend = styled(Icon).attrs((props) => ({
  name: 'send',
  size: 22,
  color: props.theme.colors.accent,
}))``;

export const Send = styled(SendGiftedChat).attrs((props) => ({
  alwaysShowSend: true,
  children: <IconSend />,
  containerStyle: {
    justifyContent: 'center',
    backgroundColor: props.theme.colors.tabBackground,
    paddingHorizontal: 8,
    height: 30,
  },
}))``;

export const Loading = styled(TextPaper)``;
