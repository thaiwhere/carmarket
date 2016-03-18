namespace Car.Framework
{
    using System;
    using System.Collections.Generic;
    using Enyim.Caching;
    using Enyim.Caching.Configuration;
    using Enyim.Caching.Memcached;

    /// <summary>
    /// Class MEMCACHED.
    /// </summary>
    public class Memcached : ICache, IDisposable
    {
        private readonly MemcachedClient _client;

        private bool _isDisposed;

        /// <summary>
        /// Initializes a new instance of the <see cref="Memcached" /> class.
        /// </summary>
        public Memcached()
        {
            _client = new MemcachedClient("memcached");
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Memcached"/> class.
        /// </summary>
        /// <param name="configSectionName">Name of the configuration section.</param>
        public Memcached(string configSectionName)
        {
            _client = new MemcachedClient(configSectionName);
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Memcached"/> class.
        /// </summary>
        /// <param name="clientConfig">The client configuration.</param>
        public Memcached(IMemcachedClientConfiguration clientConfig)
        {
            _client = new MemcachedClient(clientConfig);
        }

        /// <summary>
        /// Adds the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="value">The value object.</param>
        public void Add(string key, object value)
        {
            _client.Store(StoreMode.Add, key, value);
        }

        /// <summary>
        /// Append collection of T.
        /// </summary>
        /// <typeparam name="T">The generic type.</typeparam>
        /// <param name="key">The caching key.</param>
        /// <param name="obj">The value object.</param>
        public void Append<T>(string key, T obj)
        {
            var collection = GetCache<List<T>>(key) ?? new List<T>();
            if (!collection.Contains(obj))
            {
                collection.Add(obj);
                SetCache(key, collection);
            }
        }

        /// <summary>
        /// Destroys the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        public void Destroy(string key)
        {
            _client.Remove(key);
        }

        public void FlushAll()
        {
            _client.FlushAll();
        }

        /// <summary>
        /// Gets the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <returns>Value object.</returns>
        public object Get(string key)
        {
            return _client.Get(key);
        }

        /// <summary>
        /// Gets the specified key.
        /// </summary>
        /// <typeparam name="T">The generic type.</typeparam>
        /// <param name="key">The caching key.</param>
        /// <returns>Value object.</returns>
        public T GetCache<T>(string key)
        {
            return _client.Get<T>(key);
        }

        /// <summary>
        /// Multiples the get.
        /// </summary>
        /// <typeparam name="T">The generic type.</typeparam>
        /// <param name="keys">The caching keys.</param>
        /// <returns>List of value objects.</returns>
        public IEnumerable<T> MultipleGet<T>(IEnumerable<string> keys)
        {
            var results = new List<T>();
            var dic = _client.Get(keys);
            foreach (var item in dic)
            {
                var tmp = (IEnumerable<T>)item.Value;
                results.AddRange(tmp);
            }

            return results;
        }      

        /// <summary>
        /// Insert or update.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="value">The value object.</param>
        public void SetCache(string key, object value)
        {
            _client.Store(StoreMode.Set, key, value);
        }

        /// <summary>
        /// Insert or update.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="value">The value object.</param>
        /// <param name="timespan">The timespan.</param>
        public void SetCache(string key, object value, TimeSpan timespan)
        {
            _client.Store(StoreMode.Set, key, value, timespan);
        }

        /// <summary>
        /// Updates the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="newobj">The new object.</param>
        public void Update(string key, object newobj)
        {
            _client.Store(StoreMode.Replace, key, newobj);
        }

        /// <summary>
        /// Updates the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="newobj">The value object.</param>
        /// <param name="timespan">The interval to expire.</param>
        public void Update(string key, object newobj, TimeSpan timespan)
        {
            _client.Store(StoreMode.Replace, key, newobj, timespan);
        }

        /// <summary>
        /// Disposes this instance.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>True</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        private void Dispose(bool disposing)
        {
            if (!_isDisposed)
            {
                if (!disposing)
                {
                    if (_client != null)
                    {
                        _client.Dispose();
                    }
                }

                _isDisposed = true;
            }
        }
    }
}