import styled from 'styled-components';
import {
  Text as TextPaper,
  TextInput,
  Button as ButtonPaper,
} from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px 30px 30px 30px;
`;

export const ContainerDetail = styled(Container)`
  justify-content: flex-start;
`;

export const H1 = styled(TextPaper)`
  font-size: 22px;
  text-align: center;
  margin: 10px 10px 10px 10px;
  text-transform: uppercase;
`;

export const H2 = styled(TextPaper)`
  text-align: center;
  margin: 0px 4px 4px 4px;
  font-size: 20px;
`;

export const H3 = styled(H2)`
  font-size: 18px;
`;

export const H4 = styled(H2)`
  font-size: 14px;
`;

export const Input = styled(TextInput)`
  margin: 10px 0px 10px 0px;
`;
export const Button = styled(ButtonPaper)`
  margin: 6px;
  height: 42px;
`;

export const LogoApp = styled.Image`
  width: 80px;
  height: 80px;
  align-self: center;
`;

const atts = (props) => {
  return {
    color: props.color,
    width: props.wpx,
    height: props.hpx,
    flex: props.f,
    height: props.h,
    width: props.w,
    margin: `
    ${props.mt | props.mv}px 
    ${props.mr | props.mh}px 
    ${props.mb | props.mv}px 
    ${props.ml | props.mh}px`,
    padding: `
    ${props.pt | props.pv}px 
    ${props.pr | props.ph}px 
    ${props.pb | props.pv}px 
    ${props.pl | props.ph}px`,
    'font-size': props.fs,
    'background-color': props.bg,
    'flex-direction': props.fd,
    'justify-content': props.jc,
    'justify-items': props.ji,
    'justify-self': props.js,
    'align-items': props.ai,
    'text-align': props.ta,
    'text-transform': props.tt,
    'align-self': props.asf,
    'align-content': props.ac,
  };
};
//! View **************************************************
export const View = styled.View`
  ${atts}
`;
//! Text **************************************************
export const Text = styled(TextPaper)`
  ${atts}
`;
