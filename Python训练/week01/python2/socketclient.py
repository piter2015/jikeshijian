import socket
host='192.168.3.12'
post=60080
# 大于1024，小于65535
with socket.socket(socket.AF_INET,socket.SOCK_STREAM) as s:
    s.connect((host,post))
    s.sendall(b'www.douban.com')
    # b,表示一个字符串组
    s.recv(1024)
    data=s.recv(1024)
print('recieved',repr(data))

# 客户端，发起请求
# 服务器端，将发去的数据返回。
# TCP

