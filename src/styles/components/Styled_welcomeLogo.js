import styled from 'styled-components';
import {Image} from 'react-native';
import {Text as TextPaper} from 'react-native-paper';

export const HeadText = styled(TextPaper)`
  text-align: center;
  text-transform: uppercase;
  padding: 14px 0px 10px 0px;
  font-size: 22px;
`;

export const SubText = styled(TextPaper)`
  text-align: center;
  color: ${(props) => `${props.theme.colors.subText}`};
`;

export const Logo = styled(Image)`
  width: 80px;
  height: 80px;
  align-self: center;
`;
