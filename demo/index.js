'use strict';

const SMSClient = require('../index');

const accessKeyId = process.env['KEY_ID'];
const secretAccessKey = process.env['KEY_SECRET'];
const phoneNum = process.env['PHONE_NUM'];

//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey});

//发送短信
const NAMES = ['笨蛋', '白痴', '傻瓜', '小可爱'];
let name = NAMES[Math.floor(Math.random() * NAMES.length)];

let curTime = new Date();
let nextTime = new Date();
nextTime.setHours(17);
nextTime.setMinutes(45);
nextTime.setSeconds(0);
let diff = nextTime - curTime;

if (diff >= 0) {
  setTimeout(function () {
    smsClient.sendSMS({
      PhoneNumbers: phoneNum,
      SignName: '咘噜咘噜',
      TemplateCode: 'SMS_79685007',
      TemplateParam: `{"name":"${name}"}`
    }).then(function (res) {
      let {Code} = res;
      if (Code === 'OK') {
        console.log(res);
        var currentdate = new Date();
        console.log('Message sent at: '
            + currentdate.getFullYear() + '/'
            + (currentdate.getMonth() + 1) + '/'
            + currentdate.getDate() + ' '
            + currentdate.getHours() + ':'
            + currentdate.getMinutes() + ':'
            + currentdate.getSeconds()
            + '| Name: ' + name);
      }
    }, function (err) {
      console.log('Failed to send SMS: ' + err);
    });
  }, diff);
}
