# 装饰类
def decorator(aClass):
    class newClass(object):
        def __init__(self, args):
            self.times = 0
            self.wrapped = aClass(args)
        def display(self):
            # 同名，比如改为runtimes().则很奇怪。使用装饰器，但不改变，类的形式。
            self.times += 1
            print("run times", self.times)
            self.wrapped.display()
    return newClass

@decorator
class MyClass(object):
    def __init__(self, number):
        self.number = number
        # 重写display
    def display(self):
        print("number is",self.number)

six = MyClass(6)
for i in range(5):
    six.display()


    # 装饰器，放在类的外面。
    # 累的装饰器，必须也是类
    # 
