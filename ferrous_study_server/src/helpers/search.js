
export function searchFilter(search, contentMenu, contentClass) {

  if (!contentMenu || !contentClass) return null;

  const objClass = JSON.parse(contentClass);

  const classFiltered = objClass.filter((obj) =>
    obj.keywords.some((keyword) => keyword.includes(search.toLowerCase()))
  );

  if (classFiltered.length === 0) return [];

  const menuOptions = [];

  function findMatchingMenus(menuItems) {
    menuItems.forEach((item) => {
      if (item?.params?.classroomId && classFiltered.some(filteredItem => filteredItem.name === item.params.classroomId)) {
        menuOptions.push(item);
      }
      if (item?.subMenu) {
        findMatchingMenus(item.subMenu);
      }
    });
  }

  findMatchingMenus(JSON.parse(contentMenu));
  return menuOptions;
}
