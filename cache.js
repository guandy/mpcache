/**
   * 自动过期缓存
  **/

const cache = {
  /**
   * 根据key获取缓存
   * #key：缓存key值
  **/
  get(key)
  {
    var data = wx.getStorageSync(key);
    if(!data)
      return null;
    var dataObj = JSON.parse(data);
    var currentTime = new Date().getTime();
    if (currentTime > dataObj.time)
    {
      wx.removeStorageSync(key);
      return null;
    }
    return dataObj.data;
  },
  /**
   * 设置缓存
   * #key：缓存key值
   * #value：缓存值
   * #min：缓存多少分钟
  **/
  set(key,value,min)
  {
    var currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes()+min);
    var timespan = currentTime.getTime();
    var cacheData = JSON.stringify({ data: value, time: timespan })
    wx.setStorageSync(key,cacheData);
  },
/**
   * 判断缓存是否存在
   * #key：缓存key值
  **/
  exists(key)
  {
    var data = this.get(key);
    if(!data) return false;
    return true;
  },
/**
   * 移除缓存
   * #key：缓存key值
  **/
  remove(key)
  {
    wx.removeStorageSync(key);
  }
}

export { cache }