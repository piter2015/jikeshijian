import requests


def get_url_short(myurl):
    user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'

    header={}

    header['user-agent']=user_agent

    # url='https://book.douban.com/top250?strat=0'
    url=myurl


    response=requests.get(url,headers=header)


    # print(response.text)

    from bs4 import BeautifulSoup as bs


    bs_info=bs(response.text,'html.parser')
    return ([tags.get_text() for tags in bs_info.find_all('span',attrs={'class':'short'})])
    



def get_url_name(myurl):

    user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'

    header={}

    header['user-agent']=user_agent

    # url='https://book.douban.com/top250?strat=0'
    url=myurl


    response=requests.get(url,headers=header)


    # print(response.text)

    from bs4 import BeautifulSoup as bs


    bs_info=bs(response.text,'html.parser')

    # print(bs_info.find_all('div',attrs={'class':'pl2'})[0])

    # string='abc'
    # len(string)
    movie_list=list()
    for tags in bs_info.find_all('div',attrs={'class':'info'}):
        mo_list=list()
        atag = tags.find('a',)
        mo_list.append(atag.get('href'))
        ll=[span.get_text() for span in atag.find_all('span', class_='title')]
        mo_list.append(ll)
        star = tags.find('div',attrs={'class':'star'}).find_all('span')
        mo_list.append(star[1].get_text())
        mo_list.append(star[3].get_text())
        mo_list.append(get_url_short(atag.get('href')))
        movie_list.append(mo_list)
    return movie_list



# for page in range(10):

urls=tuple(f'https://movie.douban.com/top250?start={page*25}'for page in range(10))


from time import sleep

if __name__=='__main__':
    movie_info=list()
    for page in urls:
        movie_info.append(get_url_name(page))
        sleep(5)
    print(movie_info)
    import csv
 
with open('test.csv', 'w', encoding='utf-8') as fp:
    writer = csv.writer(fp)
    writer.writerow(movie_info)
    fp.close()



