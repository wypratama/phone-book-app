import { useEffect, useLayoutEffect, useState } from 'react';
import client from '~/configs/graphql';
import {
  LoaderFunction,
  useLoaderData,
  useNavigate,
  ActionFunction,
  useSubmit,
  useActionData,
} from 'react-router-dom';
import { Contact } from '~/types/models.interface';
import { LoaderData } from '~/types/common.type';
import { GET_CONTACTS } from '~/services';
import CardContact from '~/components/CardContact';
import styled from '@emotion/styled';
import useHeader from '~/hooks/useHeader';
import { SearchInput, FloatingButton, Button } from '~/components/common';
import useInfiniteScroll from '~/hooks/useInfiniteScroll';
import useReactive from 'react-use-reactive';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactList = () => {
  const navigate = useNavigate();
  const { setHeaderContent } = useHeader();
  const vouchers = useReactive<{ list: Contact[]; offset: number }>({
    list: [],
    offset: 0,
  });
  const data = useLoaderData() as LoaderData<typeof loader>;
  // const nexData = useActionData() as LoaderData<typeof action>;
  const [clicked, setClicked] = useState(false);

  let submit = useSubmit();

  const loadMore = async () => {
    // await submit(
    //   { offset: (vouchers.offset += 10).toString() },
    //   {
    //     method: 'put',
    //     action: '/',
    //   }
    // );
    // vouchers.offset = vouchers.offset + 10;
    navigate('/', {
      replace: true,
      state: { offset: (vouchers.offset += 10) },
    });
  };
  const { loadingRef } = useInfiniteScroll(loadMore);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      navigate('/add');
      setClicked(false);
    }, 600);
  };

  useLayoutEffect(() => {
    setHeaderContent(<SearchInput />);
  }, []);

  useEffect(() => {
    if (data?.data?.contact) {
      vouchers.list = [
        ...vouchers.list,
        ...JSON.parse(JSON.stringify(data.data.contact)),
      ];
    }
  }, [data.data.contact]);

  // useEffect(() => {
  //   if (nexData?.data?.contact) {
  //     vouchers.list = [
  //       ...vouchers.list,
  //       ...JSON.parse(JSON.stringify(nexData.data.contact)),
  //     ];
  //   }
  // }, [nexData]);

  return (
    <>
      <List>
        {vouchers.list.map((c) => (
          <CardContact contact={c} key={c.id} />
        ))}
      </List>

      {/* {vouchers.offset ? (
        <div ref={loadingRef}>Loading...</div>
      ) : (
        <Button
          color='nord3'
          onClick={() => {
            loadMore();
          }}
          ghost
        >
          load more
        </Button>
      )} */}
      <Button
        color='nord3'
        onClick={() => {
          loadMore();
        }}
        ghost
        style={{ justifySelf: 'center' }}
      >
        load more
      </Button>
      <FloatingButton clicked={clicked} onClick={handleClick}>
        <span className='material-icons'>add</span>
      </FloatingButton>
    </>
  );
};

export const loader = (async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const offset = search.get('offset');
  console.log(request);
  const res = await client.query<{ contact: Contact[] }>({
    query: GET_CONTACTS,
    variables: {
      limit: 10,
      offset: offset || 0,
      order_by: {
        first_name: 'asc', //load a - z by default
      },
    },
  });
  console.log('loader called', request);
  return res;
}) satisfies LoaderFunction;

// export const action = (async ({ request }) => {
//   const form = await request.formData();
//   const offset = form.get('offset');
//   const res = await client.query<{ contact: Contact[] }>({
//     query: GET_CONTACTS,
//     variables: {
//       limit: 10,
//       offset: offset,
//       order_by: {
//         first_name: 'asc', //load a - z by default
//       },
//     },
//   });
//   console.log(`calling on offset ${offset}`, res);
//   return res;
// }) satisfies ActionFunction;

export default ContactList;
