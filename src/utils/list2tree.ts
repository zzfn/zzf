export function list2tree(list: any[]) {
  return list.reduce((prev: any, curr: any) => {
    const obj = list.find((item: any) => item.id === curr['replyId']);
    if (obj) {
      // 存在父节点
      !Object.prototype.hasOwnProperty.call(obj, 'children') && (obj['children'] = []);
      obj['children'].push(curr);
    } else {
      prev.push(curr);
    }
    return prev;
  }, []);
}
