/**
 *
 * @param element
 * @return {{width: *, height: *}|{width: number, height: number}}
 */
export default function boundsClientRectSize(element) {
  if (element.getBoundingClientRect) {
    let rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
    };
  }
  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}