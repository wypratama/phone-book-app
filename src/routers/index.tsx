import { createBrowserRouter, RouteObject } from 'react-router-dom';
import DefaultLayout from '~/layouts/default';
import Home, { loader as homeLoader, action as homeAction } from '~/pages';
import ContactDetail, {
  loader as contactDetaiLoader,
} from '~/pages/:contactId';
import AddContact from '~/pages/add';
import EditContact, {
  loader as editContactLoader,
} from '~/pages/edit/:contactId';

/**
 * supposed to try to load /pages as global import and auto assign its
 * default export and loader into routes object :(
 */

// const modules = import.meta.glob('/src/pages/**/*.{tsx,jsx}');

// const routes: RouteObject[] = [];
// for (const file in modules) {
//   // rome-ignore lint/suspicious/noExplicitAny: <explanation>
//   await modules[file]().then((mod: any) => {
//     const path = file
//       .replace('/src/pages', '')
//       .replace(/\.(tsx|jsx)$/, '')
//       .replace(/\/index$/, '');
//     const El = mod.default;
//     // console.log(path);
//     routes.push({
//       element: <El />,
//       path: path === '' ? '/' : path,
//       loader: mod.loader || undefined,
//       action: mod.action || undefined,
//     });
//   });
// }

const r = [
  {
    element: <DefaultLayout />,
    // children: routes,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: homeLoader,
        action: homeAction,
      },
      {
        path: '/:contactId',
        element: <ContactDetail />,
        loader: contactDetaiLoader,
      },
      {
        path: '/add',
        element: <AddContact />,
      },
      {
        path: '/edit/:contactId',
        element: <EditContact />,
        loader: editContactLoader,
      },
    ],
  },
];

const router = createBrowserRouter(r);

export default router;
