namespace Car.Framework
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;

    /// <summary>
    /// Interface ICache.
    /// </summary>
    public interface ICache
    {
        /// <summary>
        /// Adds the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="value">The value  object.</param>
        void Add(string key, object value);

        /// <summary>
        /// Appends the specified key.
        /// </summary>
        /// <typeparam name="T">The generic type.</typeparam>
        /// <param name="key">The caching key.</param>
        /// <param name="obj">The value  object.</param>
        void Append<T>(string key, T obj);

        /// <summary>
        /// Destroys the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        void Destroy(string key);

        /// <summary>
        /// Flush all cached items.
        /// </summary>
        void FlushAll();

        /// <summary>
        /// Gets the specified key.
        /// </summary>
        /// <typeparam name="T">The generic type.</typeparam>
        /// <param name="key">The caching key.</param>
        /// <returns>Value object.</returns>
        T GetCache<T>(string key);

        /// <summary>
        /// Gets the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <returns>Value object.</returns>
        [SuppressMessage("Microsoft.Naming", "CA1716:IdentifiersShouldNotMatchKeywords", Justification = "Reiviewed")]
        object Get(string key);

        /// <summary>
        /// Multiples the get.
        /// </summary>
        /// <typeparam name="T">The generic type.</typeparam>
        /// <param name="keys">The caching keys.</param>
        /// <returns>List of value objects.</returns>
        IEnumerable<T> MultipleGet<T>(IEnumerable<string> keys);       

        /// <summary>
        /// Insert or update caching items.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="value">The value object.</param>
        void SetCache(string key, object value);

        /// <summary>
        /// Insert or update caching item.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="value">The value object.</param>
        /// <param name="timespan">The timespan.</param>
        void SetCache(string key, object value, TimeSpan timespan);

        /// <summary>
        /// Updates the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="newobj">The new object.</param>
        void Update(string key, object newobj);

        /// <summary>
        /// Updates the specified key.
        /// </summary>
        /// <param name="key">The caching key.</param>
        /// <param name="newobj">The new object.</param>
        /// <param name="timespan">The timespan.</param>
        void Update(string key, object newobj, TimeSpan timespan);
    }
}