/*
 * @Author: zemin zheng
 * @Date: 2022-01-22 16:53:04
 * @LastEditTime: 2022-01-22 17:08:31
 * @LastEditors: Please set LastEditors
 * @Description: 考察promise知识点
 * @FilePath: \front-end-knowledge\lib\js\Promise.js
 */

// 请写出当前输出的顺序

console.log("start");
setTimeout(() => {
  console.log("children2");
  Promise.resolve().then(() => {
    console.log("children3");
  });
}, 0);

new Promise((resolve, reject) => {
  console.log("children4");
  setTimeout(() => {
    console.log("children5");
    // 用setTimeout将then（微任务放到下次）
    resolve("children6");
  }, 0);
}).then((res) => {
  console.log("children7");
  setTimeout(() => {
    console.log(res);
  });
});

// 当前微任务队列

// start
// children4
// 第一轮宏任务结束，尝试清空微任务队列，发现没有微任务
// children2
// 第二轮宏任务结束，尝试清空微任务队列
// children3
// children5
// children7
// children6

// 下一题
const p = function () {
  return new Promise((resolve, reject) => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 0);
      resolve(2);
    });
    p1.then((res) => {
      console.log(res);
    });
    console.log(3);
    resolve(4);
  });
};

p().then((res) => {
  console.log(res);
});

console.log("end");

// 3
// end
// 2
// 4
