import { useLayoutEffect, useState } from "react";
import client from "~/configs/graphql";
import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import { Contact } from "~/types/models.interface";
import { LoaderData } from "~/types/common.type";
import { GET_CONTACTS } from "~/services";
import CardContact from "~/components/CardContact";
import styled from "@emotion/styled";
import useHeader from "~/hooks/useHeader";
import { SearchInput, FloatingButton } from "~/components/common";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactList = () => {
	const navigate = useNavigate();
	const { setHeaderContent } = useHeader();
	const data = useLoaderData() as LoaderData<typeof loader>;
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(true);
		setTimeout(() => {
			navigate("/add");
			setClicked(false);
		}, 600);
	};

	useLayoutEffect(() => {
		setHeaderContent(<SearchInput />);
	}, []);

	return (
		<>
			<List>
				{data.data.contact.map((c) => (
					<CardContact contact={c} key={c.id} />
				))}
			</List>
			<FloatingButton clicked={clicked} onClick={handleClick}>
				<span className='material-icons'>add</span>
			</FloatingButton>
		</>
	);
};

export const loader = (async () => {
	const res = await client.query<{ contact: Contact[] }>({
		query: GET_CONTACTS,
		variables: {
			order_by: {
				first_name: "asc", //load a - z by default
			},
		},
	});
	return res;
}) satisfies LoaderFunction;

export default ContactList;
