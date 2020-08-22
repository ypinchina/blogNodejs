    const exec = require('../database/db')
    const getList = (author, keyword) => {
        // 获取博客列表的方法
        let sql = `select * from blogs where 1=1 `
        if(author) {
          sql += `and author = '${author}' `
        }
        if(keyword) {
          sql += `and title like '%${keyword}%' `
        }
        sql += `order by createtime desc`
        return exec(sql) //返回一个promise对象
    }
    const getDetail = (id) => {
      let sql = `select * from blogs where id = ${id};`
      return exec(sql)
    }
    const newBlog = (data = {}) => {
      // 表示新建一个博客 
      //data是一个博客对象，里面包含content和title 以及author作者
      let sql = `insert into blogs (title, content, author, createtime) values 
      ('${data.title}', '${data.content}', '${data.author}', ${Date.now()})
      `
      return exec(sql)
    }
    const updateBlog = (id, data = {}) => {
      let title = data.title
      let content = data.content
      let sql = `
        update blogs set title = '${title}', content = '${content}' where id = ${id};
      `
      return exec(sql).then(res => {
        if(res.affectedRows > 0) {
          return 1
        } else {
          return 0
        }
      })
    }
    const deleteBlog = (id, author) => {
      let sql = `delete from blogs where id = ${id} and author = '${author}';`
      return exec(sql).then(res => {
        if(res.affectedRows > 0) {
          return 1
        } else {
          return 0
        }
      })
    }
    module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog }