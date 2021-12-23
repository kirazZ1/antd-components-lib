/**根据路由搜索标题 */
export const searchByRoutes: (route: any, sidebar: Array<any>) => any = (
  route = "",
  sidebar
) => {
  for (let i = 0; i < sidebar.length; i++) {
    if (sidebar[i]?.link === route) return sidebar[i];
    if (sidebar[i]?.children?.length !== 0) {
      return searchByRoutes(route, sidebar[i]?.children);
    }
  }
  return null;
};
