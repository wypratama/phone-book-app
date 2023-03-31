import styled from '@emotion/styled';
import Icon from './Icon';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CONTACTS } from '~/services';
import { Link } from 'react-router-dom';
import useClickAway from '~/hooks/useClickAway';
import { Contact } from '~/types/models.interface';

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

const ResultContainer = styled.div`
  position: absolute;
  top: 55px;
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.nord4};
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow: auto;
`;

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [isShow, setIsShow] = useState(false);
  const resultRef = useRef(null);
  const [searchContact, { data }] = useLazyQuery(GET_CONTACTS, {
    variables: {
      where: {
        first_name: { _like: `%${search}%` },
      },
    },
  });

  const onClickAway = () => {
    setIsShow(false);
  };

  useClickAway(resultRef, onClickAway);

  const onSeachKeyPress = async (e: { key: string }) => {
    await searchContact();
    // }
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <StyledSearch
          type='search'
          placeholder='Search Contact'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyUp={onSeachKeyPress}
          onFocus={() => {
            setIsShow(true);
          }}
        />
        <SearchIcon>search</SearchIcon>
        {isShow ? (
          <ResultContainer ref={resultRef}>
            <p>results:</p>
            {!data || !search ? (
              <p>tidak ada hasil pencarian</p>
            ) : (
              data.contact.map((c: Contact) => (
                <Link to={`/${c.id}`}>
                  {c.first_name} {c.last_name}
                </Link>
              ))
            )}
          </ResultContainer>
        ) : null}
      </SearchWrapper>
    </SearchContainer>
  );
};
export default SearchInput;
