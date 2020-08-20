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
    const getDetail = (id) => {
      return {
        "id": 1,
        "content": "contente A",
        "author": "zhangsan",
        "title" : "articalA",
        "createTime": "1597896907988"
      }
    }
    const newBlog = (data = {}) => {
      // 表示新建一个博客 
      console.log('newBlog..data', data)//data是一个博客对象，里面包含content和title
      return {//插入到数据表里面的id
        "id": 3
      }
    }
    const updateBlog = (id, data = {}) => {
      console.log('id,  blogData', id, data)//data是一个博客对象，里面包含content和title
      return true//假数据 true表示更新成功
    }
    const deleteBlog = (id) => {
      return true //假数据 表示删除一篇博客成功
    }
    module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog }