
let gTranslate = require('../index');

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