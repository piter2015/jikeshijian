class pay():
    def __init__(self,amount,discount):
        self.amount = amount
        self.discount = discount
    
    def total(self):
        print( '折扣为：'+ str(self.discount) + '   折扣后金额为：' + str(self.amount * self.discount))


class vip(pay):
    def __init__(self,quantity,amount):
        self.quantity = quantity
        self.amount = amount
        self.discount = 1
        if self.quantity >= 10 :
            self.discount = 0.85
        if self.amount >= 200 :
            self.discount = 0.8

class novip(pay):
    def __init__(self,amount):
        self.amount = amount
        self.discount = 1
        if self.amount >=200 :
            self.discount = 0.9


class Factory:
    def getpay(self,quantity,amount,isvip ):
        if isvip == 1 :
            return vip(quantity,amount)
        else:
            return novip(amount)


if __name__ == '__main__':
    factory = Factory()
    isvip = int(input('请输入是否为VIP，1为是，0为否：'))
    quantity = int(input('请输入所购数量：'))
    amount = float(input('请输入所购总金额：'))
    paymoney = factory.getpay(quantity,amount,isvip)
    paymoney.total()




