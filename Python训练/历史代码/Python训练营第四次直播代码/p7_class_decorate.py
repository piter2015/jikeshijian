# Python 2.6 开始添加类装饰器
from functools import wraps
 
class MyClass(object):
    # 当前类的父类是谁
    # 后面是空，的，则为经典类
    # 继承关系，继承自object

    def __init__(self, var='init_var', *args, **kwargs):
        # 第一个必须self，self还不是关键字。表示实例化后的本身
        # cls表示类的本身。
        self._v = var
        super(MyClass, self).__init__(*args, **kwargs)
    
    def __call__(self, func):
        # 类的函数装饰器
        # 类里面的某个函数，增加装饰器
        @wraps(func)
        def wrapped_function(*args, **kwargs):
            func_name = func.__name__ + " was called"
            print(func_name)
            return func(*args, **kwargs)
        return wrapped_function



# 其他经常用在类装饰器的python自带装饰器
# classmethod
# staticmethod
# property


# 装饰类
# 类的装饰器
# 类的函数装饰器
# type（）定义类
