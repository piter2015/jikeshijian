import socket

host='192.168.3.12'
post=60080
with socket.socket(socket.AF_INET,socket.SOCK_STREAM) as s:
    # 接受请求，的地址，和端口，用绑定
    s.bind((host,post))
    s.listen(1)
    # 是否接受请求，1=true
    conn,addr=s.accept()
    with conn:
        print(f'conneeted from {addr}')
        while True:
            data=conn.recv(1024)
            if not data:
                break
            conn.sendall(data)

# 可以打开两个终端
# 一个终端服务，会阻塞在监听位置
# 一个终端请求
# TCP





