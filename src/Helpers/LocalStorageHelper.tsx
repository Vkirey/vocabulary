class LocalStorageHelper {
    localStorageSupported: boolean;

    constructor() {
        this.localStorageSupported = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
    }

    // add value to storage
    add(key: string, item: string) {
        if (this.localStorageSupported) {
            localStorage.setItem(key, item);
        }
    }

    get(key: string): string | null {
        if (this.localStorageSupported) {
            var item = localStorage.getItem(key);
            return item;
        } else {
            return null;
        }
    }

    remove(key: string) {
        if (this.localStorageSupported) {
            localStorage.removeItem(key);
        }
    }

    // clear storage (remove all items from it)
    clear() {
        if (this.localStorageSupported) {
            localStorage.clear();
        }
    }
}

/**
 * Instance of 'LocalStorageHelper' class. Used to work with local storage (add,remove,get,clear)
 */
export const LSHelper = new LocalStorageHelper()