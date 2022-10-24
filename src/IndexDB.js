const DB_NAME = 'SIMPLE_INDEX_DB'
const DB_STORE_NAME = 'SIMPLE_INDEX_DB_STORE'
const STORE_KEY = 'STORE_KEY'
const STORE_VALUE_KEY = 'STORE_VALUE'
const OPEN_STATUS = {
  OPENING: 0,
  SUCCESS: 1,
  FAIL: -1
}

class IndexDB {
  // db
  // status
  constructor () {
    this._init()
  }

  _init () {
    const request = window.indexedDB.open(DB_NAME)
    this.status = OPEN_STATUS.OPENING
    request.onsuccess = e => {
      this.db = request.result
      this.status = OPEN_STATUS.SUCCESS
      this.store = this._getStore()
      this._resolve && this._resolve(this.db)
      this._resolve = undefined
    }
    request.onerror = e => {
      this.status = OPEN_STATUS.FAIL
      this._reject && this._reject(e)
      this._reject = undefined
      this._errorInfo = e
    }
    request.onupgradeneeded = e => {
      this.db = request.result
      this._createStore()
    }
  }

  /**
   * 数据库加载完成调用
   * @return {Promise<IDBDatabase>}
   */
  load () {
    return new Promise((resolve, reject) => {
      if (this.status === OPEN_STATUS.OPENING) {
        this._resolve = resolve
        this._reject = reject
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        this.status === OPEN_STATUS.SUCCESS ? resolve(this.db) : reject(this._errorInfo)
      }
    })
  }

  _checkStore (name) {
    return this.db.objectStoreNames.contains(name)
  }

  _getStore () {
    const transaction = this.db.transaction(DB_STORE_NAME, 'readwrite')
    return transaction.objectStore(DB_STORE_NAME)
  }

  _createStore () {
    if (!this._checkStore(DB_STORE_NAME)) {
      const store = this.db.createObjectStore(DB_STORE_NAME, { keyPath: STORE_KEY })
      store.createIndex(STORE_KEY, STORE_KEY, { unique: true })
    }
    // return this._checkStore(DB_STORE_NAME) ? this._getStore() : this.db.createObjectStore(DB_STORE_NAME, { keyPath: DB_STORE_NAME })
  }

  get (key) {
    const request = this.store.get(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = e => resolve(request.result[STORE_VALUE_KEY])
      request.onerror = e => reject(e)
    })
  }

  set (key, value) {
    const data = {}
    data[STORE_KEY] = key
    data[STORE_VALUE_KEY] = value
    const request = this.store.put(data)
    return new Promise((resolve, reject) => {
      request.onsuccess = e => resolve()
      request.onerror = e => reject(e)
    })
  }
}

export default IndexDB
