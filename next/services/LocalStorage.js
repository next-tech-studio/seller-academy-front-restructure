class LocalStorage {
  get (key) {
    const item = localStorage.getItem(key)

    try {
      return JSON.parse(item)
    } catch (e) {
      return item
    }
  }

  set (key, value) {
    const val = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, val)
  }

  check (key) {
    return localStorage.getItem(key) != null
  }

  getProp (obj, key) {
    return localStorage.getItem(obj) != null ? JSON.parse(localStorage.getItem(obj))[key] : ''
  }

  remove (keys) {
    if (Array.isArray(keys)) {
      keys.forEach((item) => {
        localStorage.removeItem(item)
      })
    } else {
      localStorage.removeItem(keys)
    }
  }
}

export default new LocalStorage();
