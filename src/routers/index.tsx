import { createBrowserRouter, RouteObject } from 'react-router-dom';
import DefaultLayout from '~/layouts/default';
import { HeaderProvider } from '~/hooks/useHeader';

const modules = import.meta.glob('/src/pages/**/*.{tsx,jsx}');

let routes: RouteObject[] = [];
for (const file in modules) {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  await modules[file]().then((mod: any) => {
    const path = file
      .replace('/src/pages', '')
      .replace(/\.(tsx|jsx)$/, '')
      .replace(/\/index$/, '');
    let El = mod.default;
    // console.log(path);
    routes.push({
      element: <El />,
      path: path === '' ? '/' : path,
      loader: mod.loader || undefined,
      action: mod.action || undefined,
    });
  });
}

const r = [
  {
    element: <DefaultLayout />,
    children: routes,
  },
];
console.log(routes);

const router = createBrowserRouter(r);

export default router;
