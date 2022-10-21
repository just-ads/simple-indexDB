import IndexDB from './IndexDB'

function support () {
  if (window.indexedDB) return new IndexDB()
  throw Error('此浏览器不支持indexDB')
}

export default support()
