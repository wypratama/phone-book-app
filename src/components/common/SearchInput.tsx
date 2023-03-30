import styled from '@emotion/styled';
import Icon from './Icon';

const SearchContainer = styled.div`
  ${({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${theme.spacing.base} 0;
  `}
`;

const StyledSearch = styled.input`
  ${({ theme }) => `
    width: 100%;
    padding:${theme.spacing.base} ${theme.spacing.base};
    padding-left: 40px;
    border-radius: ${theme.borderRadius.large};
    outline: none;
    border: none;
    background: ${theme.colors.nord4}
  `}
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 12px;
  left: 12px;
`;

const SearchInput = () => {
  return (
    <SearchContainer>
      <SearchWrapper>
        <StyledSearch type='search' placeholder='Search Contact' />
        <SearchIcon>search</SearchIcon>
      </SearchWrapper>
    </SearchContainer>
  );
};
export default SearchInput;
