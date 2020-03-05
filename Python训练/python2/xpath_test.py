import requests
import lxml.etree

urll='https://book.douban.com/subject/34867159/?icn=index-latestbook-subject'

user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4068.5 Safari/537.36'
header={}
header['user-agent']=user_agent


response=requests.get(urll,headers=header)
selector=lxml.etree.HTML(response.text)

name=selector.xpath('//*[@id="wrapper"]/h1/span')


print(name)
mylist=[str(name),' 作者','4.5']
columns_name=['one']

import pandas as pd

book1=pd.DataFrame(columns=columns_name,data=mylist)
book1.to_csv('./book1.csv',encoding='gbk')


