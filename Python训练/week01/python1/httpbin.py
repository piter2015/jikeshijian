import requests

def get_url_name(myurl):

    user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'

    header={}

    header['user-agent']=user_agent

    # url='https://book.douban.com/top250?strat=0'
    url=myurl


    resget=requests.get(url+"get",headers=header)

    print("get")
    print(resget.json())

    respost=requests.post(url+"post",headers=header)
    respost.encoding = 'utf-8'
    print("post")
    print(respost.json())

    # from bs4 import BeautifulSoup as bs


    # bs_info=bs(response.text,'html.parser')

    

# for page in range(10):

urls="http://httpbin.org/"


from time import sleep

if __name__=='__main__':

    get_url_name(urls)
    sleep(5)


