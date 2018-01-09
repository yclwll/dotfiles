Install on Debian


```Bash
apt update

modprobe tcp_bbr
echo "tcp_bbr" >> /etc/modules-load.d/modules.conf
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
sysctl -p
sysctl net.ipv4.tcp_available_congestion_control
sysctl net.ipv4.tcp_congestion_control
```


```Bash
vim /etc/sysctl.d/local.conf
# max open files
fs.file-max = 51200
# max read buffer
net.core.rmem_max = 67108864
# max write buffer
net.core.wmem_max = 67108864
# default read buffer
net.core.rmem_default = 65536
# default write buffer
net.core.wmem_default = 65536
# max processor input queue
net.core.netdev_max_backlog = 4096
# max backlog
net.core.somaxconn = 4096

# resist SYN flood attacks
net.ipv4.tcp_syncookies = 1
# reuse timewait sockets when safe
net.ipv4.tcp_tw_reuse = 1
# turn off fast timewait sockets recycling
net.ipv4.tcp_tw_recycle = 0
# short FIN timeout
net.ipv4.tcp_fin_timeout = 30
# short keepalive time
net.ipv4.tcp_keepalive_time = 1200
# outbound port range
net.ipv4.ip_local_port_range = 10000 65000
# max SYN backlog
net.ipv4.tcp_max_syn_backlog = 4096
# max timewait sockets held by system simultaneously
net.ipv4.tcp_max_tw_buckets = 5000
# turn on TCP Fast Open on both client and server side
net.ipv4.tcp_fastopen = 3
# TCP receive buffer
net.ipv4.tcp_rmem = 4096 87380 67108864
# TCP write buffer
net.ipv4.tcp_wmem = 4096 65536 67108864
# turn on path MTU discovery
net.ipv4.tcp_mtu_probing = 1

net.ipv4.tcp_congestion_control = bbr

sysctl --system
```


```Bash
apt-get install build-essential 
wget https://github.com/jedisct1/libsodium/releases/download/1.0.15/libsodium-1.0.15.tar.gz
tar xvf libsodium-1.0.15.tar.gz 
cd libsodium-1.0.15/
./configure && make &&make check && make install
ldconfig
```

```Bash
 wget --no-check-certificate https://github.com/kuoruan/shell-scripts/raw/master/kcptun/kcptun.sh
 chmod +x ./kcptun.sh
./kcptun.sh

{
  "localaddr": ":18640",
  "remoteaddr": "VPS_IP:10159",
  "key": "xxxxx",
  "crypt": "salsa20",
  "mode": "fast2",
  "mtu": 1350,
  "sndwnd": 2048,
  "rcvwnd": 2048,
  "datashard": 10,
  "parityshard": 3,
  "dscp": 0,
  "nocomp": false,
  "acknodelay": false,
  "sockbuf": 4194304,
  "keepalive": 10
}
```


```Bash
apt install python3-pip
pip3 install https://github.com/shadowsocks/shadowsocks/archive/master.zip
ssserver --version
mkdir /etc/shadowsocks
vim /etc/shadowsocks/config.json
 { 
  "server": "VPS_IP",
  "_comment": {
	"18640":"me",
	"14690":"lo"
  },
  "port_password": {
	"18640": "XXX",
	"14690": "XXX"
  },
  "local_address": "127.0.0.1",
  "local_port": 1080,
  "timeout": 300,
  "method": "chacha20",
  "fast_open": true
  }

vim /etc/systemd/system/shadowsocks-server.service
[Unit]
Description=Shadowsocks Server
After=network.target

[Service]
ExecStartPre=/bin/sh -c 'ulimit -n 51200'
ExecStart=/usr/local/bin/ssserver -c /etc/shadowsocks/config.json
Restart=on-abort

[Install]
WantedBy=multi-user.target
```


```Bash
systemctl daemon-reload

systemctl enable shadowsocks-server.service 
systemctl restart shadowsocks-server.service 

service supervisord restart
supervisorctl restart kcptun
```
