import styled from "styled-components";

export const StyledFooter = styled.footer`
  background-color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.footer};
  }
  h3 {
    &:hover {
      color: white;
    }
  }
`;
