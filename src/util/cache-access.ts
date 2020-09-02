import cacheManager, { Cache, CachingConfig } from 'cache-manager';
import fsStore from 'cache-manager-fs';

export class CacheAccess {

    private cache: Cache;

    constructor() {
        this.cache = cacheManager.caching({
            store: fsStore,
            ttl: 5,
            options: {
                ttl: 5 /* seconds */,
                maxsize: 1000 * 1000 * 1000 /* max size in bytes on disk */,
                path: 'diskcache',
                preventfill: false
            }
        });
    }

    async get<T>(key: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.cache.get(key, (err, result: T) => {
                if (err) {
                    return reject(new Error(err));
                }
                return resolve(result);
            });
        });
    }

    async set<T>(key: string, val: T, options: CachingConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.cache.set(key, val, options, (err) => {
                if (err) {
                    return reject(new Error(err));
                }
                return resolve();
            });
        });
    }

    async del(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.cache.del(key, (err) => {
                if (err) {
                    return reject(new Error(err));
                }
                return resolve();
            });
        });
    }

    async reset(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.cache.reset(() => resolve());
        });
    }
}