# 用在哪里
# 来源于flask
# 注册
# 请求HTML文件的时候，只接受两种方式，
# 返回的时候增加前端代码。
@route('index',methods=['GET','POST'])
def static_html():
    return  render_templete('index.html')

# 等效于
static_html = route('index',methods=['GET','POST'])(static_html)


def route(rule, **options):
    def decorator(f):
        endpoint = options.pop("endpoint", None)
        # 使用类似字典的结构以'index'为key 以 method static_html  其他参数为value存储绑定关系
        self.add_url_rule(rule, endpoint, f, **options)
        return f
    return decorator



# 游戏的升级里，也可以用装饰器。英雄升级。装备外套
# 日志逻辑，给函数增加，装饰器
# 访问控制和授权。
# 附加请求。装饰器里内容，与函数内容绑定，比如限制访问频率。增加缓存。



# 比如给返回函数，添加头，体，尾
# 还可以写在类上
