namespace Car.Framework
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Caching;

    /// <summary>
    /// Class RuntimeCache.
    /// </summary>
    public class RuntimeCache : ICache
    {
        private readonly ObjectCache _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="RuntimeCache" /> class.
        /// </summary>
        public RuntimeCache()
        {
            _context = MemoryCache.Default;
        }

        /// <summary>
        /// Adds the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="value">The value object.</param>
        public void Add(string key, object value)
        {
            var expire = new TimeSpan(0, 0, 300);
            Add(key, value, expire);
        }

        /// <summary>
        /// Default expiredTime=30'.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="value">The value object.</param>
        /// <param name="expire">The expire.</param>
        public void Add(string key, object value, TimeSpan expire)
        {
            var policy = new CacheItemPolicy
                             {
                                 SlidingExpiration = expire,
                                 Priority = CacheItemPriority.Default
                             };
            _context.Add(key, value, policy);
        }

        /// <summary>
        /// Appends the specified key.
        /// </summary>
        /// <typeparam name="T">The generic type.</typeparam>
        /// <param name="key">The caching key.</param>
        /// <param name="obj">The value object.</param>
        /// <exception cref="System.NotImplementedException">Not implemented.</exception>
        public void Append<T>(string key, T obj)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Destroys the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        public void Destroy(string key)
        {
            _context.Remove(key);
        }

        public void FlushAll()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <returns>Value object.</returns>
        public object Get(string key)
        {
            return _context.Get(key);
        }

        /// <summary>
        /// Gets the specified key.
        /// </summary>
        /// <typeparam name="T">The generic type.</typeparam>
        /// <param name="key">The caching key.</param>
        /// <returns>Value object.</returns>
        public T GetCache<T>(string key)
        {
            return (T)_context.Get(key);
        }

        /// <summary>
        /// Multiples the get.
        /// </summary>
        /// <typeparam name="T">The generic type.</typeparam>
        /// <param name="keys">The caching keys.</param>
        /// <returns>List of value objects.</returns>
        /// <exception cref="System.NotImplementedException">Not implemented.</exception>
        public IEnumerable<T> MultipleGet<T>(IEnumerable<string> keys)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Insert or update.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="value">The value object.</param>
        public void SetCache(string key, object value)
        {
            var expire = new TimeSpan(0, 0, 300);
            SetCache(key, value, expire);
        }

        /// <summary>
        /// Sets the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="value">The value object.</param>
        /// <param name="timespan">The expire.</param>
        public void SetCache(string key, object value, TimeSpan timespan)
        {
            var isExist = _context.Contains(key);
            if (isExist)
            {
                Update(key, value, timespan);
            }
            else
            {
                Add(key, value, timespan);
            }
        }

        /// <summary>
        /// Updates the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="newobj">The new object.</param>
        public void Update(string key, object newobj)
        {
            var policy = new CacheItemPolicy { Priority = CacheItemPriority.Default };
            _context.Set(key, newobj, policy);
        }

        /// <summary>
        /// Updates the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="newobj">The new object.</param>
        /// <param name="timespan">The expire.</param>
        public void Update(string key, object newobj, TimeSpan timespan)
        {
            var policy = new CacheItemPolicy
                            {
                                Priority = CacheItemPriority.Default,
                                SlidingExpiration = timespan
                            };
            _context.Set(key, newobj, policy);
        }      
    }
}