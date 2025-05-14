
export function searchFilter(search, contentMenu, contentClass) {
  const classFiltered = contentClass.filter((obj) =>
    obj.keywords.some((keyword) => keyword.includes(search))
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

  findMatchingMenus(contentMenu);
  return menuOptions;
}
