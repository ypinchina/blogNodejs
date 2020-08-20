    const getList = (author, keyword) => {
        // 获取博客列表的方法 假数据 但是格式是对的
      return [{
        "id": 1,
        "content": "contente A",
        "author": "zhangsan",
        "title" : "articalA",
        "createTime": "1597896907988"
      },{
        "id": 2,
        "content": "contente B",
        "author": "lisi",
         "title" : "articalB",
        "createTime": "1597896918467"
      }]
    }
    module.exports = { getList }