import styled from 'styled-components';

// Paper
import {Subheading as SubheadingPaper} from 'react-native-paper';

// Component
import {Button as CustomBtn} from '../../components/CustomBtn';

export const Subheading = styled(SubheadingPaper)`
  font-size: 16;
  margin: 0px 8px 0px 8px;
  ${(props) => (props.color ? `color:` + props.color : null)}
`;

export const Button = styled(CustomBtn)`
  justify-content: center;
`;
