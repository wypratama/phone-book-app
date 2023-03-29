import styled from "@emotion/styled";

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
    padding:${theme.spacing.small} ${theme.spacing.base};
    border-radius: ${theme.borderRadius.large};
    outline: none;
    border: none;
    background: ${theme.colors.nord4}
  `}
`;

const SearchInput = () => {
	return (
		<SearchContainer>
			<StyledSearch type='search' placeholder='Search Contact' />;
		</SearchContainer>
	);
};
export default SearchInput;
