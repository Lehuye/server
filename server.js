#!/usr/bin/env node
const WebSocket = require("ws");
const readline = require("readline");

const port = 30725; // 定义 WebSocket 服务器的端口
const wss = new WebSocket.Server({ port });

// 创建命令行输入接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

wss.on("connection", (ws) => {
  console.log("客户端已连接");

  // 监听来自插件的消息
  ws.on("message", (message) => {
    const messageString = message.toString(); // 将 Buffer 转换为字符串
    console.log("收到插件的消息:", messageString);

    const data = JSON.parse(messageString);

    if (data.type === "process-data") {
      // 模拟将数据发送到 client.js 进行处理
      const processedData = processClientData(data.data);

      // 返回处理后的数据给插件
      ws.send(JSON.stringify({ type: "process-data", data: processedData }));
    }

    // 广播接收到的消息给所有已连接的客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString); // 直接广播原始消息
      }
    });
  });

  ws.on("close", () => {
    console.log("客户端已断开连接");
  });
});

// 提示用户输入内容并广播给所有客户端
function promptInput() {
  rl.question("请输入要广播的消息: ", (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("👋 退出服务器输入模式");
      rl.close();
    } else {
      // 广播消息给所有已连接的客户端
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "process-data", data: input }));
        }
      });
      promptInput(); // 继续提示输入
    }
  });
}

// 启动输入提示
promptInput();

function processClientData(input) {
  // 模拟 client.js 的数据处理逻辑
  return input.toUpperCase(); // 将输入数据转换为大写
}

console.log(`✅ WebSocket 服务运行中，端口 ${port}`);