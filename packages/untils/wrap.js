let wrap = (elements, wrapper) => {
  // Convert `elements` to an array, if necessary.
  let targets = elements.length ? elements : [elements];

  // Loops backwards to prevent having to clone the wrapper on the
  // first button (see `child` below).
  Array.from(targets)
    .reverse()
    .forEach((element, index) => {
      const child = index > 0 ? wrapper.cloneNode(true) : wrapper;
      const parent = element.parentNode;
      const sibling = element.nextSibling;

      // Wrap the button (is automatically removed from its current
      // parent).
      child.appendChild(element);

      // If the button had a sibling, insert the wrapper before
      // the sibling to maintain the HTML structure; otherwise, just
      // append it to the parent.
      if (sibling) {
        parent.insertBefore(child, sibling);
      } else {
        parent.appendChild(child);
      }
    });
}

export default wrap;