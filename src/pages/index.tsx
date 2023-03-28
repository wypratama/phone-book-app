import client from '~/configs/graphql';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { Contact } from '~/types/models.interface';
import { LoaderData } from '~/types/common.type';
import { GET_CONTACTS } from '~/services';

const ContactList = () => {
  const data = useLoaderData() as LoaderData<typeof loader>;

  return (
    <div>
      {data.data.contact.map((c) => (
        <div key={c.id}>
          <p>
            {c.first_name} {c.last_name}
          </p>
        </div>
      ))}
    </div>
  );
};

export const loader = (async () => {
  const res = await client.query<{ contact: Contact[] }>({
    query: GET_CONTACTS,
    variables: {
      order_by: {
        first_name: 'asc', //load a - z by default
      },
    },
  });
  return res;
}) satisfies LoaderFunction;

export default ContactList;
