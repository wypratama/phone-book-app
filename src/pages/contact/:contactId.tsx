import { LoaderFunction, useLoaderData } from 'react-router-dom';
import client from '~/configs/graphql';
import { GET_CONTACT_DETAIL } from '~/services';
import { LoaderData } from '~/types/common.type';
import { Contact } from '~/types/models.interface';

export default function ContactDetail() {
  const {
    data: { contact_by_pk: contact },
  } = useLoaderData() as LoaderData<typeof loader>;

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
}

export const loader = (async ({ params, request }) => {
  const res = await client.query<{ contact_by_pk: Contact }>({
    query: GET_CONTACT_DETAIL,
    variables: {
      id: params.contactId,
    },
  });
  console.log(res);
  return res;
}) satisfies LoaderFunction;
