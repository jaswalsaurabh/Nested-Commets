const useTraverseTree = () => {
  function insertNode(tree, body, author, parent) {
    tree.unshift({
      id: new Date().getTime(),
      author,
      body,
      edit: false,
      reply: false,
      parent
    });

    return tree;
  }

  function updateNode(tree, body, id) {
    tree.forEach((obj) => {
      if (obj.id === id) {
        obj.body = body;
      }
    });
    return tree;
  }

  function makeActive(tree, itemId, kind) {
    tree.forEach((obj) => {
      if (obj.id === itemId) {
        if (kind === "edit") {
          obj.edit = true;
          obj.reply = false;
        } else {
          obj.edit = false;
          obj.reply = true;
        }
      }
    });
    return tree;
  }

  return { insertNode, makeActive, updateNode };
};

export default useTraverseTree;
