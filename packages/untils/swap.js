import {add} from './index'

/**
 * swap content
 * @param source
 * @param container
 */
let swap = (source, container) =>  {
  source = source.parentNode.removeChild(source);
  add(container, source)
}

export default swap;