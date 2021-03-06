extends ../layout

block content
    h2.page-header 文章列表

    form.form-inline.form-filter
        div.form-group
            label 分类
            select#js-category.form-control(name="category")
                option(value="", selected=(filter.category === "")) - 选择分类 -
                each category in categories
                    option(value=category._id, selected=(category._id.toString() === filter.category))= category.name

        div.form-group
            label 作者
            select#js-author.form-control(name="author")
                option(value="", selected=(filter.author === "")) - 选择作者 -
                each author in authors
                    option(value=author._id, selected=(author._id.toString() === filter.author))= author.name

        div.form-group
            label 关键词
            input#js-keyword.form-control(name="keyword", type="text", value=filter.keyword)

        button#js-filter-submit.btn.btn-info 筛选

    table.table.table-bordered
        thead
            tr
                th(width="30%") 
                    if sortby === 'title'
                        if (sortdir === 'desc')
                            a(href="/admin/posts?page=" + pageNum + "&sortby=title&sortdir=asc")
                                i.fa.fa-arrow-down
                                &nbsp;标题
                        else
                            a(href="/admin/posts?page=" + pageNum + "&sortby=title&sortdir=desc")
                                i.fa.fa-arrow-up
                                &nbsp;标题
                    else
                        a(href="/admin/posts?page=" + pageNum + "&sortby=title&sortdir=desc")
                            标题
                th 分类
                th 作者
                th 
                    if sortby === 'created'
                        if (sortdir === 'desc')
                            a(href="/admin/posts?page=" + pageNum + "&sortby=created&sortdir=asc")
                                i.fa.fa-arrow-down
                                &nbsp;添加时间
                        else
                            a(href="/admin/posts?page=" + pageNum + "&sortby=created&sortdir=desc")
                                i.fa.fa-arrow-up
                                &nbsp;添加时间
                    else
                        a(href="/admin/posts?page=" + pageNum + "&sortby=created&sortdir=desc")
                            添加时间
                th 被赞
                th 评论
                th 状态
                th 管理
        tbody
        each post in posts
            tr
                td
                    a(href="/posts/view/" + post._id, target="_blank", title=post.slug)= post.title
                td= post.category.name
                td= post.author.name
                td= moment(post.created).format('YYYY-MM-DD HH:mm:ss')
                td= post.meta.favorites || 0
                td= post.comments.length || 0
                td= post.published ? '已发布' : '待发布'
                td
                    a(href="/posts/view/" + post._id, class="btn btn-sm btn-success", target="_blank") 查看
                    &nbsp;&nbsp;
                    a(href="/admin/posts/edit/" + post._id, class="btn btn-sm btn-info") 编辑
                    &nbsp;&nbsp;
                    a(href="/admin/posts/delete/" + post._id, class="btn btn-sm btn-danger") 删除

    if pageCount > 1
        nav
            ul.pagination
                - var currentPage = 1
                while currentPage < pageCount
                    if (currentPage === pageNum)
                        li.active
                            a(href="/admin/posts?page=" + currentPage + "&category=" + filter.category + "&author=" + filter.author + "&sortby=" + sortby + "&sortdir=" + sortdir)= currentPage++
                    else
                        li
                            a(href="/admin/posts?page=" + currentPage + "&category=" + filter.category + "&authors=" + filter.author + "&sortby=" + sortby + "&sortdir=" + sortdir)= currentPage++

block scripts
    script(src='/js/querystring.js')
    script(src='/js/admin/post.js')





