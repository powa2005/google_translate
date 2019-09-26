# Nodejs调用谷歌翻译API进行翻译

## 安装

`npm install google-translate-node --save`

## 使用

```
/**
 * @param target   需要翻译的文字
 * @param tl       翻译的目标语言 默认 'en'
 * @param sl       需要翻译文字所属语言 默认  'auto'
 * @param opt      其他参数
 */
gTranslate(target, tl, sl, opt)
```


```
let gTranslate = require('../index');

// async/await 写法
const test = async() => {
	try{
        let res = await gTranslate('我是一个兵');
		console.log(res);
    }catch(e){
        console.log(e);
    }
	console.log('done');
}

test();

// Promise写法
gTranslate('我是一个兵').then(res => {
	console.log(res)
}, err => {
	console.log(err);
})

```
