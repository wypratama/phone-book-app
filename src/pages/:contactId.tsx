import { useLayoutEffect } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import Avatar from '~/components/common/Avatar';
import client from '~/configs/graphql';
import useHeader from '~/hooks/useHeader';
import { GET_CONTACT_DETAIL } from '~/services';
import { LoaderData } from '~/types/common.type';
import { Contact } from '~/types/models.interface';

const ContactDetail = () => {
  const { setHeaderContent } = useHeader();
  const {
    data: { contact_by_pk: contact },
  } = useLoaderData() as LoaderData<typeof loader>;

  useLayoutEffect(() => {
    setHeaderContent(
      <div>
        <Avatar contact={contact} size={60} />
        <p>
          {contact.first_name} {contact.last_name}
        </p>
      </div>
    );
  }, []);

  return (
    <div>
      <p>
        {contact.first_name} {contact.last_name}
      </p>
      <p>Phone Number:</p>
      {contact.phones.map((phone) => (
        <div key={phone.number}>{phone.number}</div>
      ))}
    </div>
  );
};

export const loader = (async ({ params, request }) => {
  const res = await client.query<{ contact_by_pk: Contact }>({
    query: GET_CONTACT_DETAIL,
    variables: {
      id: params.contactId,
    },
  });
  return res;
}) satisfies LoaderFunction;

export default ContactDetail;
