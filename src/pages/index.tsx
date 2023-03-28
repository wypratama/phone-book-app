import client from '~/configs/graphql';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { Contact } from '~/types/models.interface';
import { LoaderData } from '~/types/common.type';
import { GET_CONTACTS } from '~/services';

const ContactList = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as LoaderData<typeof loader>;

  return (
    <div>
      {data.data.contact.map((c) => (
        <div
          key={c.id}
          onClick={() => navigate(`/contact/${c.id}`)}
          onKeyDown={(e) => e.preventDefault()}
        >
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
