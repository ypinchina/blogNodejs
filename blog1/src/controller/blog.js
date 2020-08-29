    const { exec, escape } = require('../database/db')
    const xss = require('xss')
    const getList = (author, keyword) => {
        // 获取博客列表的方法
        let sql = `select * from blogs where 1=1 `
        if(author) {
          author = escape(author)
          sql += `and author = ${author} `
        }
        if(keyword) {
          sql += `and title like '%${keyword}%' `
        }
        sql += `order by createtime desc`
        return exec(sql) //返回一个promise对象
    }
    const getDetail = (id) => {
      id = escape(id)
      let sql = `select * from blogs where id = ${id};`
      return exec(sql)
    }
    const newBlog = (data = {}) => {
      // 表示新建一个博客 
      //data是一个博客对象，里面包含content和title 以及author作者
      let title = escape(xss(data.title))
      let content = escape(xss(data.content))
      let author = escape(xss(data.author))
      let sql = `insert into blogs (title, content, author, createtime) values 
      (${title}, ${content}, ${author}, ${Date.now()})
      `
      return exec(sql)
    }
    const updateBlog = (id, data = {}) => {
      let title = escape(xss(data.title))
      let content = escape(xss(data.content))
      id = escape(id)
      let sql = `
        update blogs set title = ${title}, content = ${content} where id = ${id};
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
      id = escape(id)
      author = escape(author)
      let sql = `delete from blogs where id = ${id} and author = ${author};`
      return exec(sql).then(res => {
        if(res.affectedRows > 0) {
          return 1
        } else {
          return 0
        }
      })
    }
    module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog }