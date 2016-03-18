namespace Car.Framework
{
    /// <summary>
    /// Class CacheManager.
    /// </summary>
    public static class CacheManager
    {
        /// <summary>
        /// The default type.
        /// </summary>
        private const CacheType DefaultType = CacheType.Runtime;

        /// <summary>
        /// GetInstance - Default.
        /// </summary>
        /// <returns>ICache object.</returns>
        public static ICache GetInstance()
        {
            return GetInstance(DefaultType);
        }

        /// <summary>
        /// GetInstance - CacheType.
        /// </summary>
        /// <param name="type">The cache type.</param>
        /// <returns>ICache object.</returns>
        public static ICache GetInstance(CacheType type)
        {
            switch (type)
            {
                case CacheType.Memcache:
                    return new Memcached();

                case CacheType.Runtime:
                default:
                    return new RuntimeCache();
            }
        }
    }
}