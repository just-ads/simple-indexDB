const DB_NAME = 'SIMPLE_INDEX_DB'
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
      this._resolve && this._resolve()
      this._resolve = undefined
    }
    request.onerror = e => {
      this.status = OPEN_STATUS.FAIL
      this._reject && this._reject()
      this._reject = undefined
    }
    request.onupgradeneeded = e => {
      console.log(e)
    }
  }

  load () {
    return new Promise((resolve, reject) => {
      if (this.status === OPEN_STATUS.OPENING) {
        this._resolve = resolve
        this._reject = reject
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        this.status === OPEN_STATUS.SUCCESS ? resolve() : reject()
      }
    })
  }

  createStore (name) {
    return new Promise((resolve, reject) => {

    })
  }
}

export default IndexDB
