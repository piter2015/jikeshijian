# 讲解属性

# I have a dream
class MyFirstClass:
    pass
a = MyFirstClass()
b = MyFirstClass()

# 不同内存地址，两个不同对象
a
b


# 女娲
class Human(object):
    # 静态字段
    live = True

    def __init__(self, name):
        # 普通字段
        self.name = name

man = Human('Adam')
woman = Human('Eve')


Human.__dict__
# 有name属性
man.__dict__

# 实例可以使用普通字段也可以使用静态字段
man.name
man.live

# 类可以使用类属性
Human.live


# 内置类型不能增加属性和方法
# 自己定义的类，可以添加
# 内置类型添加会报错typeerror
setattr(list,"","")

class Human2(object):
    # 人为约定不可修改
    _age = 0

    # 私有属性
    # 私有属性，不能调用
    __fly = False

    # 魔术方法，不会自动改名
    # 如 __init__

# __dict__可以找到私有属性
# 私有属性是自动改名，来不让使用的机制。
# 
# 自动改名机制
dir(Human2)


# 类属性，在内存中有一份
# 对象属性，可以有多份


